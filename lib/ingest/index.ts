import { existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import chokidar from "chokidar";
import { config } from "@/lib/config/config";
import { promises as fs, readFileSync } from 'fs';
import standardsJSON from "@/lib/standards/schemas.json";
import * as standards from "@/lib/standards/standards";
import write from "@/lib/database/write";
import { connection } from "@/lib/database/connection";
import * as ethers from "ethers";
import { CronJob } from "cron";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash"
import { extname, basename } from 'node:path';
import { refRootName } from '../database/generateTables';
import { readFB } from '../utility/flatbufferConversion';
import { readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { getTrustedAddress } from "@/lib/auth/index"

let queue: Array<any> = [];
let isProcessing: Boolean = false;
let CronJobs: Array<CronJob> = [];
async function readDirectoryRecursively(dir: string): Promise<string[]> {
    const files = await fs.readdir(dir);
    const filePaths: string[] = [];

    for (const file of files) {
        const filePath = `${dir}/${file}`;
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) {
            filePaths.push(...await readDirectoryRecursively(filePath));
        } else {
            filePaths.push(filePath);
        }
    }

    return filePaths;
}

let watchPath: string;

const getFileData = (filename) => {
    let trimmedFile = basename(filename);
    const [fstandard, ext] = trimmedFile.split(".").slice(-2);
    const standard = fstandard.toUpperCase();
    let signedFile = filename.replace(".sig", "");
    let signatureFile = extname(trimmedFile) === ".sig" ? filename : `${filename}.sig`;
    return { signedFile, signatureFile, ext, standard };
}

export const init = async (folder: string) => {
    if (!existsSync(folder)) {
        mkdirSync(folder);
    }

    watchPath = folder;

    const watcher = chokidar.watch(folder, {
        awaitWriteFinish: {
            stabilityThreshold: 2000,
            pollInterval: 2000
        }
    }).on("all", async (event, filename) => {
        if (event === "add" && extname(filename) === ".fbs") {
            let _file = getFileData(filename);
            let { signedFile, signatureFile, ext, standard } = _file;
            if (existsSync(signedFile) && existsSync(signatureFile) && ~["fbs"].indexOf(ext) && !isProcessing && standardsJSON[standard]) {
                if (!isProcessing) {
                    processData(signedFile, signatureFile, standard);
                }
            } else if (signedFile) {
                queue.push(_file);
            }
        }
    });

    if (config.cronjobs?.length) {
        for (let cJ of config.cronjobs) {
            CronJobs.push(new CronJob(
                cJ.cron,
                function () {
                    try {
                        let stdout = execSync(cJ.command).toString();
                        console.log(stdout);
                    } catch (e) {
                        console.error(e);
                    }
                },
                null,
                true,
                'Etc/UTC'
            ));
        }
    }
}

async function processData(signedFile: string, signatureFile: string, standard: string) {

    isProcessing = true;
    const currentStandard = standardsJSON[standard];

    try {

        if (config.data.verbose) {
            console.log(`${Date.now()} - Ingesting File ${signedFile}`);
        }

        let mtime: Date = statSync(signedFile).mtime;
        let inputFile: any = readFileSync(signedFile);
        let CID = await ipfsHash.of(inputFile);

        let currentCID = await connection("FILE_IMPORT_TABLE").where({ CID }).first();

        if (!currentCID) {
            let tableName = refRootName(currentStandard.$ref);
            let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
            let parentClass: any = standards[pClassName];

            let inputSignature: any;
            if (!existsSync(signatureFile)) {
                console.warn(`${signedFile}: could not find digital signature.`)
            } else {
                inputSignature = await readFile(signatureFile, "utf8");
            }
            let input, signedEthAddress;

            if (inputSignature) {
                signedEthAddress = (await ethers.verifyMessage(CID, inputSignature)).toLowerCase()
            }

            if (!signedEthAddress || !getTrustedAddress(signedEthAddress)) {
                console.warn(`${new Date().toISOString()} signature for ${signedFile} is invalid from address ${signedEthAddress}`);
            }

            input = readFB(inputFile, tableName, parentClass);

            await write(
                connection,
                standard,
                input,
                currentStandard,
                CID,
                inputSignature,
                signedEthAddress as string,
                standard.toUpperCase(),
                mtime
            ).catch(e => {
                throw Error(e);
            });

            console.log("remove", signatureFile, signedFile);
        }

        rmSync(signatureFile);
        rmSync(signedFile);
    } catch (e) {
        throw Error(e?.toString());
    }

    isProcessing = false;

    if (queue.length) {
        const nextFileData = queue.pop();
        await processData(nextFileData.signedFile, nextFileData.signatureFile, nextFileData.standard);
    }

}

export const getQueue = () => {
    return queue;
}

export const deinit = async () => {
}



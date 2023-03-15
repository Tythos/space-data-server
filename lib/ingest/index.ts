import { existsSync, mkdirSync, rmSync, statSync, unwatchFile, writeFileSync } from 'node:fs';
import { writeFile, access } from "node:fs/promises"
import chokidar from "chokidar";
import { config } from "@/lib/config/config";
import { promises as fs, readFileSync } from 'fs';
import standardsJSON from "@/lib/standards/schemas.json";
import * as standards from "@/lib/standards/standards";
import write from "@/lib/database/write";
import { connection } from "@/lib/database/connection";
import { join } from "path";
import * as ethers from "ethers";
import { CronJob } from "cron";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash"
import { extname, basename } from 'node:path';
import { refRootName } from '../database/generateTables';
import { readFB, writeFB } from '../utility/flatbufferConversion';
import { readFile, rename } from 'node:fs/promises';
import { execSync } from 'node:child_process';

let queue: Array<string> = [];
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

export const init = async (folder: string) => {
    if (!existsSync(folder)) {
        mkdirSync(folder);
    }
    queue = await readDirectoryRecursively(folder);

    await processData(queue.pop() as string);

    watchPath = folder;

    const watcher = chokidar.watch(folder, {
        awaitWriteFinish: {
            stabilityThreshold: 2000,
            pollInterval: 2000
        }
    }).on("all", async (event, filename) => {
        if (event === "add" && filename && !~queue.indexOf(filename)) {
            if (!isProcessing) {
                processData(filename);
            } else {
                queue.push(filename);
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

async function processData(file: string) {
    isProcessing = true;
    if (!file) {
        isProcessing = false;
        return;
    }

    if (config.data.verbose) {
        console.log(`${Date.now()} - Ingesting File ${file}`);
    }

    let trimmedFile = basename(file);

    const [fileName, fstandard, ext] = trimmedFile.split(".");

    const standard = fstandard.toUpperCase();
    let signedFile = file.replace(".sig", "");
    let signatureFile = extname(trimmedFile) === ".sig" ? file : `${file}.sig`;

    if (existsSync(signedFile) && ~["fbs"].indexOf(ext)) {
        let mtime: Date = statSync(signedFile).mtime;
        let inputFile: any = readFileSync(signedFile);
        let CID = await ipfsHash.of(inputFile);


        let currentCID = await connection("FILE_IMPORT_TABLE").where({ CID }).first();



        if (!currentCID) {
            //@ts-ignore
            let currentStandard = standardsJSON[standard];
            if (!currentStandard) {
                return;
            }

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
                signedEthAddress = (await ethers.utils.verifyMessage(CID, inputSignature)).toLowerCase()
            }

            if (!signedEthAddress || !config.trustedAddresses[signedEthAddress]) {
                console.warn(`${new Date().toISOString()} signature for ${signedFile} is invalid.`);
                return;
            }
            if (extname(signedFile) === ".fbs") {
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
                );
            } else {
                return;
            }
        }
        rmSync(signatureFile);
        rmSync(signedFile);
    }
    if (queue.length) {
        await processData(queue.pop() as string);
    }
    isProcessing = false;
}

export const getQueue = () => {
    return queue;
}

export const deinit = async () => {
    unwatchFile(watchPath);
}



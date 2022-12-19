import { existsSync, mkdirSync, unwatchFile } from 'node:fs';
import chokidar from "chokidar";
import { config } from "@/lib/config/config";
import { promises as fs } from 'fs';
import standardsJSON from "@/lib/standards/schemas.json";
import * as standards from "@/lib/standards/standards";
import write from "@/lib/database/write";
import { connection } from "@/lib/database/connection";
import { sep } from "path";
import { verifySig } from '../routes/spacedata/post';
import { CronJob } from "cron";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash"
import { extname, basename } from 'node:path';
import { refRootName } from '../database/generateTables';
import { readFB } from '../utility/flatbufferConversion';
import { readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { sign } from 'node:crypto';

let queue: Array<string> = [];
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
    await processData();
    watchPath = folder;

    chokidar.watch(folder).on("all", async (event, filename) => {

        if (event === "add" && filename) {
            queue.push(filename);
            await processData();
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

async function processData() {
    const returnFunc = () => {
        if (queue.length) {
            processData();
        }
    }
    let file = queue.pop();
    if (!file) {
        returnFunc();
        return;
    }

    let trimmedFile = basename(file);

    const [fileName, fstandard, ext] = trimmedFile.split(".");
    const standard = fstandard.toUpperCase();
    let signedFile = file.replace(".sig", "");
    let signatureFile = extname(trimmedFile) === ".sig" ? file : `${file}.sig`;

    if (existsSync(signedFile)) {
        let inputFile: any = await readFile(signedFile);
        let CID = await ipfsHash.of(inputFile);
        //@ts-ignore
        let currentStandard = standardsJSON[standard];
        if (!currentStandard) {
            returnFunc();
            return;
        }
        let tableName = refRootName(currentStandard.$ref);
        let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
        let parentClass: any = standards[pClassName];
        let cClassName: keyof typeof parentClass = `${tableName}COLLECTIONT`;


        let inputSignature: any;
        if (!existsSync(signatureFile)) {
            console.warn(`${signedFile}: could not find digital signature.`)
        } else {
            inputSignature = await readFile(signatureFile, "utf8");
        }
        let input, signedEthAddress;
        if (inputSignature) {
            signedEthAddress = verifySig(CID, "", inputSignature);
        }

        if (!signedEthAddress) {
            console.warn(`${new Date().toISOString()} signature for ${signedFile} is invalid.`);
        }

        if (extname(signedFile) === ".json") {
            input = new parentClass[cClassName];
            try {
                inputFile = JSON.parse(inputFile.toString("utf8"));
            } catch (e) {
                console.error(`Unable to parse file ${inputFile}`);
                returnFunc();
                return;
            }
            for (let s = 0; s < inputFile.RECORDS.length; s++) {
                input.RECORDS.push(inputFile.RECORDS[s]);
            }
        } else if (extname(signedFile) === ".fbs") {
            input = readFB(inputFile, tableName, parentClass);
        } else {
            return;
        }
        let currentCID = await connection("FILE_IMPORT_TABLE").where({ CID }).first();
        console.log(currentCID, CID, signedEthAddress, inputSignature)
        if (!currentCID) {
            write(connection, standard, input.RECORDS, currentStandard, CID, inputSignature);
        }
    }

}

export const getQueue = () => {
    return queue;
}

export const deinit = async () => {
    unwatchFile(watchPath);
}



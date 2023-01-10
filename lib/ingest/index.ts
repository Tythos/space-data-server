import { existsSync, mkdirSync, statSync, unwatchFile, writeFileSync } from 'node:fs';
import { writeFile, access } from "node:fs/promises"
import chokidar from "chokidar";
import { config } from "@/lib/config/config";
import { promises as fs, readFileSync } from 'fs';
import standardsJSON from "@/lib/standards/schemas.json";
import * as standards from "@/lib/standards/standards";
import write from "@/lib/database/write";
import { connection } from "@/lib/database/connection";
import { join } from "path";
import { verifySig } from '../routes/spacedata/post';
import { CronJob } from "cron";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash"
import { extname, basename } from 'node:path';
import { refRootName } from '../database/generateTables';
import { readFB, writeFB } from '../utility/flatbufferConversion';
import { readFile, rename } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { roundToUTCDate } from "@/lib/utility/roundDate"

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

    chokidar.watch(folder, {
        awaitWriteFinish: {
            stabilityThreshold: 2000,
            pollInterval: 200
        }
    }).on("all", async (event, filename) => {

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

const writeFiles = async (writePath: string, CID: string, input: any) => {
    if (!input.pack) {
        throw Error("NO INPUT")
    }

    mkdirSync(writePath, { recursive: true });

    const fbsPath = join(
        writePath,
        `${CID}.fbs`);
    const jsonPath = join(
        writePath,
        `${CID}.json`);

    if (!input) return;
    try {
        await access(fbsPath);
        await writeFile(fbsPath, writeFB(input));
    } catch (e) {

    }
    try {
        await access(jsonPath)
        await writeFile(jsonPath, JSON.stringify(input));
    } catch (e) {
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

    if (existsSync(signedFile) && ~["fbs", "json"].indexOf(ext)) {
        let mtime: string = new Date(statSync(signedFile).mtime).toISOString();
        let inputFile: any = readFileSync(signedFile);
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
            signedEthAddress = verifySig(CID, undefined, inputSignature);
        }

        if (!signedEthAddress) {
            console.warn(`${new Date().toISOString()} signature for ${signedFile} is invalid.`);
            return;
        }

        if (extname(signedFile) === ".json") {
            input = new parentClass[cClassName];
            let parsedInputFile;
            try {
                parsedInputFile = JSON.parse(inputFile.toString("utf8"));
            } catch (e) {
                console.log(inputFile, signedFile);
                console.error(`Unable to parse file ${inputFile}`);
                returnFunc();
                return;
            }
            for (let s = 0; s < parsedInputFile.RECORDS.length; s++) {
                input.RECORDS.push(parsedInputFile.RECORDS[s]);
            }
        } else if (extname(signedFile) === ".fbs") {
            input = readFB(inputFile, tableName, parentClass);
        } else {
            return;
        }

        let currentCID = await connection("FILE_IMPORT_TABLE").where({ CID }).first();

        if (!currentCID) {
            write(connection, standard, input.RECORDS, currentStandard, CID, inputSignature, signedEthAddress as string, standard.toUpperCase(), mtime);
        }

        let { CID: latestCID } = await connection("FILE_IMPORT_TABLE").select("*").where({ "PROVIDER": signedEthAddress }).orderBy("created_at").first();

        if (config.data.copyOnRead) {
            const writePath = join(
                config.data.public,
                standard.toUpperCase(),
                signedEthAddress as string,
                roundToUTCDate(new Date(statSync(signedFile).mtime)).toISOString());
            writeFiles(writePath, CID, input);
        }
    }

}

export const getQueue = () => {
    return queue;
}

export const deinit = async () => {
    unwatchFile(watchPath);
}



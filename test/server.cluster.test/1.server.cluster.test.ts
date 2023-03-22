import request from "supertest";
import { generateData } from "../utility/generate.test.data";
const dataPath: string = `test/output/data/`;
import { app } from "@/lib/worker/app";
import * as standards from "@/lib/standards/standards";
import path, { dirname, extname, join } from "node:path";
import { access, accessSync, exists, existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, rmSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { ethWallet } from "@/test/utility/generate.crypto.wallets";
import { connection } from "@/lib/database/connection";
import { config } from "@/lib/config/config"
import standardsJSON from "@/lib/standards/schemas.json";
import { JSONSchema4 } from "json-schema";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import { init, deinit } from "@/lib/ingest/index";
import { generateDatabase } from "@/lib/database/generateTables";
import { readFB } from "@/lib/utility/flatbufferConversion";
import cluster, { Worker } from "cluster";
import { cpus } from "node:os";
import { ChildProcess } from "node:child_process";
import { checkLock, removeLock } from "@/lib/database/checkLock";

//@ts-ignore
var databaseConfig = config.database.config[config.database.config.primary];
const sqlfilename = join(dirname(databaseConfig.connection.filename), "standards.sql");
let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON as any);
const lockFilePath = join(__dirname, '.writelock');

const totalCPUs = cpus().length;
let bingoProcess: Number = 0;

const forkWorkers = (worker?: Worker) => {
    while (Object.keys(
        cluster.workers as unknown as NodeJS.Dict<Worker>
    ).length < totalCPUs) {
        let needBingo = false;
        if (!bingoProcess || worker?.process.pid === bingoProcess) {
            needBingo = true;
        }
        let cWorker: ChildProcess | any = cluster.fork({ "BINGO": needBingo });
        bingoProcess = needBingo ? cWorker.process.pid : bingoProcess;
    }
}

if (cluster.isPrimary) {
    beforeAll(async () => {

        let testdbPath: any = path.dirname(databaseConfig.connection.filename).split(path.sep).pop();

        if (existsSync(testdbPath)) {
            rmdirSync(testdbPath, { recursive: true });
            mkdirSync(testdbPath);
        }

        try {
            if (existsSync(config.data.fileSystemPath)) {
                rmdirSync(config.data.fileSystemPath, { recursive: true });
            }
        } catch (e) {
            throw new Error(`Could not delete ${config.data.fileSystemPath}`);
        }

        if (!existsSync(databaseConfig.connection.filename)) {
            await generateDatabase(standardsArray, databaseConfig.connection.filename, `${config.database.path}/standards.sql`, connection, databaseConfig.version);
        }

    });
    describe("Build Cluster", () => {
        it("should create child processes", async () => {
            forkWorkers();
            expect(Object.keys(cluster.workers as unknown as NodeJS.Dict<Worker>).length).toEqual(totalCPUs);
        });
    });

} else {

    describe("Test Cluster Read", () => {
        it("Writes Records", async () => {
            if (process.env.BINGO === "true") {
                expect(process.pid).toBeGreaterThan(0);
                let recordsToInsert: Array<any> = [];
                for (let i = 0; i < 10; i++) {
                    recordsToInsert.push({
                        CID: process.pid.toString() + " " + performance.now(),
                        DIGITAL_SIGNATURE: process.pid.toString(),
                        PROVIDER: process.pid.toString(),
                        STANDARD: "TST",
                        RECORD_COUNT: 10,
                        created_at: (new Date()).toISOString()
                    });
                }
                await connection("FILE_IMPORT_TABLE").insert(recordsToInsert).catch((e: any) => {
                    console.log("ERROR", e);
                });

            } else {
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
            let records = await connection("FILE_IMPORT_TABLE").select("*").catch((e) => {
                console.log(e)
            });
            expect(records.length).toBeGreaterThanOrEqual(10);
        }, 30000);
    });

    describe("Test Cluster Write", () => {
        it("Writes Records", async () => {
            let recordsToInsert: Array<any> = [];
            let totalRecords: number = 500;

            for (let i = 0; i < totalRecords; i++) {
                recordsToInsert.push({
                    CID: process.pid.toString() + " " + i,
                    DIGITAL_SIGNATURE: process.pid.toString(),
                    PROVIDER: process.pid.toString(),
                    STANDARD: "TST",
                    RECORD_COUNT: 10,
                    created_at: (new Date()).toISOString()
                });
            }

            await checkLock();

            try {
                await connection("FILE_IMPORT_TABLE").insert(recordsToInsert);
            } catch (e) {

            }

            removeLock();

            await new Promise((resolve) => setTimeout(resolve, 3000));

            let records = await connection("FILE_IMPORT_TABLE").select("*");

            expect((records
                .filter(r => r.CID.startsWith(process.pid.toString())).length))
                .toBeGreaterThanOrEqual(totalRecords);

        }, 30000);
    });

    afterAll(() => {
        //rmSync(lockFilePath);
    })
}
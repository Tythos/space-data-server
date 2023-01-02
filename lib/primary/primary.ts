import { InitableProcess } from "../class/process.interface";
import cluster, { Worker } from "cluster";
import { cpus } from "os";
import { pid } from "process";
import { ChildProcess } from 'node:child_process';
import { generateDatabase } from "../database/generateTables";
import { config } from "@/lib/config/config"
import { connection } from "../database/connection";
import { JSONSchema4 } from "json-schema";
import { existsSync } from "fs";
import standardsJSON from "@/lib/standards/schemas.json";

const databaseConfig = (config.database.config as any)[config.database.config.primary as any];

let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON) as unknown as Array<JSONSchema4>;
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

export default {
    init: async function () {
        if (!existsSync(databaseConfig.connection.filename)) {
            await generateDatabase(standardsArray, databaseConfig.connection.filename, `./.database/standards.sql`, connection, databaseConfig.version);
        }

        console.log(`Number of CPUs is ${totalCPUs}`);
        console.log(`Master ${pid} is running`);

        // Fork workers.
        forkWorkers();

        cluster.on("exit", (worker: Worker, code, signal) => {

            console.log(`worker ${worker.process.pid} died`);
            console.log("Let's fork another worker!");
            forkWorkers(worker)
        });
    },
    deinit: function () {
    }
} as InitableProcess
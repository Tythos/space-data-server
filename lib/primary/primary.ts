import { InitableProcess } from "../class/process.interface";
import cluster from "cluster";
import { cpus } from "os";
import { pid } from "process";
import { ChildProcess } from 'node:child_process';
import { generateDatabase } from "../database/generateTables";
import databaseConfig from "@/lib/database/config/config.json";
import { connection } from "../database/connection";
import { JSONSchema4 } from "json-schema";
import { existsSync, readFileSync } from "fs";
import standardsJSON from "@/lib/standards/schemas.json";
let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON) as unknown as Array<JSONSchema4>;
const totalCPUs = cpus().length;

let bingoProcess: Number = 0;

export default {
    init: async function () {
        if (!existsSync(databaseConfig.connection.filename)) {
            console.log(databaseConfig.connection)
            await generateDatabase(standardsArray, databaseConfig.connection.filename, `./.database/standards.${databaseConfig.version}.sql`, connection);
        }

        console.log(`Number of CPUs is ${totalCPUs}`);
        console.log(`Master ${pid} is running`);

        // Fork workers.
        for (let i = 0; i < totalCPUs; i++) {
            let cWorker: ChildProcess | any = cluster.fork();
            if (!bingoProcess) {
                bingoProcess = cWorker.process.pid;
            }
        }

        cluster.on("exit", (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            console.log("Let's fork another worker!");
            while (Object.keys(
                cluster.workers as unknown as NodeJS.Dict<Worker>
            ).length < totalCPUs) {
                let cWorker: ChildProcess | any = cluster.fork();
                if (worker.process.pid === bingoProcess) {
                    bingoProcess = cWorker.process.pid;
                }
                console.log(bingoProcess, Object.keys(cluster.workers as unknown as NodeJS.Dict<Worker>), totalCPUs)
            }
        });
    },
    deinit: function () {

    }
} as InitableProcess
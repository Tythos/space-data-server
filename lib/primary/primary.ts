import { InitableProcess } from "../class/process.interface";
import cluster, { Worker } from "cluster";
import { cpus } from "os";
import { pid } from "process";
import { ChildProcess } from 'node:child_process';
import { generateDatabase } from "../database/generateTables";
import { config } from "../config/config";
import { connection } from "../database/connection";
import { JSONSchema4 } from "json-schema";
import { existsSync } from "fs";
import standardsJSON from "../standards/schemas.json";
import { IPFSController, startIPFS } from "../../lib/ipfs/index";
import { resolve } from "path";

let ipfsController: IPFSController;
const gatewayPort = 5002;
const apiPort = 9002;

//TODO Move to Config

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
            await generateDatabase(standardsArray, databaseConfig.connection.filename, `./${config.database.path}/standards.sql`, connection, databaseConfig.version);
        }

        console.log(`Number of CPUs is ${totalCPUs}`);
        console.log(`Master ${pid} is running`);

        // Fork workers.
        forkWorkers();

        // Start IPFS
        ipfsController = await startIPFS(gatewayPort, apiPort);

        setTimeout(async () => {
            const keys = await ipfsController.api("/key/list");
            if (!keys?.Keys.length) {
                throw Error("IPFS Service Not Started.")
            }
        }, 5000);

        const folderToPin = resolve(__dirname, "..", config.data.fileSystemPath);

        setTimeout(async () => {
            console.log('Starting Pin')
            let CID = await ipfsController.publishDirectory(folderToPin);
            console.log("pins", CID);
        }, 5000);

        cluster.on("exit", (worker: Worker, code, signal) => {

            console.log(`worker ${worker.process.pid} died`);
            console.log("Let's fork another worker!");
            forkWorkers(worker);
        });
    },
    deinit: function () {
        ipfsController.process.kill("SIGKILL");
    }
} as InitableProcess
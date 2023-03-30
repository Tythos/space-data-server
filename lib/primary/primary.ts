import { InitableProcess } from "../class/process.interface";
import cluster, { Worker } from "cluster";
import { cpus } from "os";
import { pid } from "process";
import { ChildProcess } from "node:child_process";
import { generateDatabase } from "../database/generateTables";
import { config } from "../config/config";
import { connection } from "../database/connection";
import { JSONSchema4 } from "json-schema";
import { existsSync } from "fs";
import standardsJSON from "../standards/schemas.json";
import { COMMANDS, IPC } from "../class/ipc.interface";
import { HDNodeWallet, verifyMessage } from "ethers";
import { PublicKeyVerification } from "../class/publickey.interface";
import { keyconverter } from "keyconverter/src/keyconverter";
import type { FormatOptions } from "keyconverter/src/keyconverter";
import { adminCheck } from "../routes/admin";

const kCArgs = {
    kty: "EC",
    name: "ECDSA",
    namedCurve: "K-256",
    hash: "SHA-256"
} as EcKeyGenParams;

const adminKC: keyconverter = new keyconverter(kCArgs);

//TODO Move to Config

const databaseConfig = (config.database.config as any)[config.database.config.primary as any];

let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON) as unknown as Array<JSONSchema4>;
const totalCPUs = cpus().length;

let bingoWorker: Worker | undefined;
let ethWallet;
const publicKeyCache: PublicKeyVerification = { publicKey: "", nonce: "", nonceSignature: "", ethAddress: "", ipnsCID: "", ipfsPID: "" };

const restartWorkers = () => {
    // Disconnect all workers
    for (const id in cluster.workers) {

        const worker = cluster.workers[id];
        if (worker) {
            worker.disconnect();
        }
    }
    bingoWorker = undefined;
    // Start new worker processes
    forkWorkers();
};

const forkWorkers = (worker?: Worker) => {
    while (Object.keys(
        cluster.workers as unknown as NodeJS.Dict<Worker>
    ).length < totalCPUs) {

        let needBingo = false;

        if (bingoWorker === undefined || worker?.process.pid === bingoWorker?.process.pid) {
            needBingo = true;
        }

        let cWorker: ChildProcess | any = cluster.fork({ "BINGO": needBingo });
        bingoWorker = needBingo ? cWorker : bingoWorker;

        cWorker.on("message", async (msg: IPC) => {
            if (msg.command === COMMANDS["WORKERS:RESTART"]) {
                console.log("Received restart request from worker");
                restartWorkers();
            } else if (msg.command === COMMANDS["IPFS:PRIVATEKEY:RESPONSE"]) {
                ethWallet = HDNodeWallet.fromPhrase(msg.payload);
                adminKC.import(msg.payload, "bip39");
            } else if (msg.command === COMMANDS["IPFS:PUBLICKEY:REQUEST"]) {
                cWorker.send({
                    id: msg.id,
                    command: COMMANDS["IPFS:PUBLICKEY:RESPONSE"],
                    payload: ethWallet?.publicKey
                });
            } else if (msg.command === COMMANDS["ETH:SIGN"] && ethWallet) {
                if (!publicKeyCache.ethAddress) {
                    publicKeyCache.ethAddress = ethWallet.address;
                    publicKeyCache.ipfsPID = (await adminKC.ipfsPeerID()).toString();
                    publicKeyCache.ipnsCID = await adminKC.ipnsCID() as string;
                }

                publicKeyCache.nonce = msg.payload;
                publicKeyCache.nonceSignature = (ethWallet as HDNodeWallet)?.signMessageSync(msg.payload);

                cWorker.send({
                    id: msg.id,
                    command: COMMANDS["ETH:SIGN:RESPONSE"],
                    payload: publicKeyCache
                });
            }
        });

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


    },
    deinit: function () {

    }
} as InitableProcess
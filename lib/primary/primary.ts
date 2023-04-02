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
import { HDNodeWallet } from "ethers";
import { PublicKeyVerification } from "../class/publickey.interface";
import { keyconverter } from "keyconverter/src/keyconverter";
import { decryptMessage, encryptMessage } from "../utility/encryption";
import { IPFSUtilities } from "../ipfs";

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

const resetPKC = async (msg: IPC, nonce: any = performance.now().toString()) => {
    publicKeyCache.ethAddress = ethWallet.address;
    publicKeyCache.ipfsPID = (await adminKC.ipfsPeerID()).toString();
    publicKeyCache.ipnsCID = await adminKC.ipnsCID() as string;
    publicKeyCache.publicKey = ethWallet.publicKey;
    publicKeyCache.nonce = nonce || msg.payload;
    publicKeyCache.nonceSignature = (ethWallet as HDNodeWallet)?.signMessageSync(publicKeyCache.nonce);
}

const trustedAddresses = config.trustedAddresses.map(tA => tA.address);

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
                await adminKC.import(msg.payload, "bip39");
            } else if (msg.command === COMMANDS["IPFS:PUBLICKEY:REQUEST"]) {
                cWorker.send({
                    id: msg.id,
                    command: COMMANDS["IPFS:PUBLICKEY:RESPONSE"],
                    payload: ethWallet?.publicKey
                });
            } else if (msg.command === COMMANDS["ETH:SIGN"] && ethWallet) {
                await resetPKC(msg, msg.payload);
                cWorker.send({
                    id: msg.id,
                    command: COMMANDS["ETH:SIGN:RESPONSE"],
                    payload: publicKeyCache
                });
            } else if (msg.command === COMMANDS["ETH:DECRYPT"] && ethWallet) {
                cWorker.send({
                    id: msg.id,
                    command: COMMANDS["ETH:DECRYPT:RESPONSE"],
                    payload: await decryptMessage(ethWallet.privateKey, msg.payload, trustedAddresses)
                });
            } else if (msg.command === COMMANDS["ETH:ENCRYPT"] && ethWallet) {
                let { publicKey, payload } = msg.payload;
                if (publicKey.type === "Buffer") {
                    publicKey = Buffer.from(publicKey.data);
                }
                cWorker.send({
                    id: msg.id,
                    command: COMMANDS["ETH:ENCRYPT:RESPONSE"],
                    payload: await encryptMessage(publicKey, payload, ethWallet)
                });
            } else if (msg.command === COMMANDS["IPFS:CHANGEKEY"] && ethWallet) {
                let newMnemonic = await decryptMessage(ethWallet.privateKey, msg.payload, trustedAddresses).catch(e => {
                    cWorker.send({
                        id: msg.id,
                        command: COMMANDS["IPFS:CHANGEKEY:RESPONSE"],
                        payload: { error: e }
                    })
                }) as string;
                ethWallet = HDNodeWallet.fromPhrase(newMnemonic);
                const adminKCReset: keyconverter = new keyconverter(kCArgs);
                await adminKCReset.import(newMnemonic, "bip39");
                IPFSUtilities.importKey(await adminKCReset.export("ipfs:protobuf", "private") as ArrayBuffer);
                await resetPKC(msg, performance.now().toString());
                cWorker.send({
                    id: msg.id,
                    command: COMMANDS["IPFS:CHANGEKEY:RESPONSE"],
                    payload: publicKeyCache
                });
                setTimeout(restartWorkers, 1000);
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
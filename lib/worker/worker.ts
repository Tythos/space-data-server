import { InitableProcess } from "../class/process.interface";
import { app } from "./app";
import { pid } from "process";
import { config } from "@/lib/config/config";
import { init as ingestInit } from "@/lib/ingest/index";
import { join } from "path";
import dotenv from "dotenv";
import { IPFSController, startIPFS } from "../../lib/ipfs/index";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import cluster, { Worker } from "cluster";

const port: String | undefined = process.env.PORT || config.server.port.toString() || "3000";


const gatewayPort = 5002;
const apiPort = 9002;



export default {
    ipfsController: undefined as IPFSController | undefined,
    init: async function () {
        process.env.BINGO
        dotenv.config();

        if (process.env.BINGO === "true") {
            try {
                await ingestInit(config.data.ingest);
                console.log(`${new Date().toISOString()},PID:${process.pid},Ingest service started in folder ${join(process.cwd(), config.data.ingest)}`)
            } catch (e) {
                console.log(e);
            }

            // Start IPFS
            this.ipfsController = await startIPFS(gatewayPort, apiPort);

            setTimeout(async () => {
                const keys = await this.ipfsController.api("/key/list");
                if (!keys?.Keys.length) {
                    throw Error("IPFS Service Not Started.")
                }
            }, 5000);

            const folderToPin = resolve(__dirname, "..", config.data.fileSystemPath);
            const pinFolder = async () => {
                let CID = await this.ipfsController.publishDirectory(folderToPin);
                console.log("Pinned Folder: ", CID);
            }
            setTimeout(async () => {
                console.log('Starting Pin');
                if (existsSync(folderToPin)) {
                    pinFolder();
                } else {
                    console.log(`Folder ${folderToPin} does not exist, creating...`);
                    mkdirSync(folderToPin);
                    pinFolder();
                }
            }, 5000);
        } else {
            app.listen(port, () => {
                console.log(`⚡️[child process ${pid} server]: Server is running at https://localhost:${port}`);
            });
        }

    },
    deinit: async function () {
        if (process.env.BINGO && this.ipfsController?.process) {
            this.ipfsController.process.kill("SIGKILL");
        }
    }
} as InitableProcess;
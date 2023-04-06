import { InitableProcess } from "../class/process.interface";
import { app } from "./app";
import { pid } from "process";
import { config } from "@/lib/config/config";
import { init as ingestInit } from "@/lib/ingest/index";
import { join } from "path";
import dotenv from "dotenv";
import { IPFSController, IPFSUtilities, startIPFS, keyName, defaultAPIPort, defaultGatewayPort } from "../../lib/ipfs/index";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import { COMMANDS } from "../class/ipc.interface";
import { ipcRequest } from "../utility/ipc";
import { writeServerInfo } from "../logging/serverinfo";
import { pinFolderInit } from "@/lib/ipfs/pinfolder"
const port: String | undefined = process.env.PORT || config.server.port.toString() || "3000";

import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { refRootName } from "@/lib/database/generateTables";
import { readFB } from "@/lib/utility/flatbufferConversion";
import { FSWatcher } from "chokidar";

const standardsJSON: KeyValueDataStructure = _standardsJSON;
let folderPinWatch: FSWatcher;

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
            this.ipfsController = await startIPFS();
            await new Promise((resolve, reject) => { setTimeout(resolve, 5000) });

            const keys = await this.ipfsController.api("/key/list");

            if (!keys?.Keys.length) {
                throw Error("IPFS Service Not Started.");
            }

            (process as any).publicKey = await ipcRequest({
                command: COMMANDS["IPFS:PRIVATEKEY:RESPONSE"],
                id: performance.now(),
                payload: await IPFSUtilities.readKey(keyName, "bip39")
            }) as any;


            folderPinWatch = await pinFolderInit(this.ipfsController) as FSWatcher;

            await writeServerInfo();
            
                        const testResolve = await this.ipfsController.api("/name/resolve?arg=kzwfwjn5ji4pupg0z6ywwdvjbe82554qaryjv9jxeencc77tqkdy9mfsxhb0qi6");
                        const testList = await this.ipfsController.api(`/ls?arg=${testResolve.Path.split("/").pop()}`);
                        //let manifestLink = testList.Objects[0].Links.filter(m => m.Name === "manifest.json");
                        for (let link in testList.Objects[0].Links) {
                            let _link = testList.Objects[0].Links[link];
                            console.log(JSON.stringify(await this.ipfsController.api(`/ls?arg=${_link.Hash}`), null, 4));
                        }
                        /*//console.log(JSON.stringify(testList, null, 4));
                        if (manifestLink.length) {
                          console.log(manifestLink[0].Hash)
                          const manifest = await this.ipfsController.api(`/cat?arg=${manifestLink[0].Hash}`, null, "application/json");
                          console.log(JSON.stringify(manifest, null, 4));
                          const file = await this.ipfsController.api(`/cat?arg=Qma2sqx852AT8WioCTczpaAAkzViYEkgtc9pScN6LrftpZ`);
                          let currentStandard = standardsJSON["MPE"];
                          let tableName = refRootName(currentStandard.$ref);
                          let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
                          let parentClass: any = standards[pClassName];
                          //console.log(file, JSON.stringify(readFB(file, tableName, parentClass), null, 4));
                      }
                      //console.log(JSON.stringify(testList, null, 4));*/
        } else {

            app.listen(port, () => {
                console.log(`⚡️[child process ${pid} server]: Server is running at https://localhost:${port}`);
            });

            setTimeout(async () => {
                while (!(process as any).publicKey?.ethAddress) {
                    (process as any).publicKey = (await ipcRequest(
                        {
                            command: COMMANDS["ETH:SIGN"],
                            payload: (new Date()).toISOString()
                        }) as any);
                }
            }, 10000);

        }

    },
    deinit: async function () {
        if (process.env.BINGO && this.ipfsController?.process) {
            this.ipfsController.process.kill("SIGKILL");
        }
        //folderPinWatch.unwatch(folderPinWatch.getWatched());
    }
} as InitableProcess;
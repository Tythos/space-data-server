
import { config } from "@/lib/config/config";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import { writeServerInfo } from "../logging/serverinfo";
import chokidar from "chokidar";

let debounce;

export const pinFolderInit = async (ipfsController) => {
    const folderToPin = resolve(__dirname, "..", config.data.fileSystemPath);

    return chokidar.watch(folderToPin, {
        awaitWriteFinish: {
            stabilityThreshold: 5000,
            pollInterval: 5000
        }
    }).on("all", async () => {

        clearTimeout(debounce);

        debounce = setTimeout(async () => {
            console.log('Starting Pin');
            if (existsSync(folderToPin)) {
            } else {
                console.log(`Folder ${folderToPin} does not exist, creating...`);
                mkdirSync(folderToPin);
            }
            let CID = await ipfsController.publishDirectory(folderToPin);
            console.log("Pinned Folder: ", CID);
            await writeServerInfo({ ipfsCID: CID });
        }, 2000)

    })

}
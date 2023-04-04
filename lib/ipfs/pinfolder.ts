
import { config } from "@/lib/config/config";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import { writeServerInfo } from "../logging/serverinfo";
import chokidar from "chokidar";

let debounce;

const doPin = async (folderToPin, ipfsController) => {
    console.log('Starting Pin');
    if (existsSync(folderToPin)) {
    } else {
        console.log(`Folder ${folderToPin} does not exist, creating...`);
        mkdirSync(folderToPin);
    }
    let CID = await ipfsController.publishDirectory(folderToPin);
    console.log("Pinned Folder: ", CID);
    await writeServerInfo({ ipfsCID: CID });
    debounce = setTimeout(async () => {
        await doPin(folderToPin, ipfsController);
    }, 1000 * 60 * 60 * 3);
}

export const pinFolderInit = async (ipfsController) => {
    const folderToPin = resolve(__dirname, "..", config.data.fileSystemPath);

    await doPin(folderToPin, ipfsController);

    return chokidar.watch(folderToPin, {
        awaitWriteFinish: {
            stabilityThreshold: 5000,
            pollInterval: 5000
        }
    }).on("all", async () => {

        clearTimeout(debounce);

        debounce = setTimeout(async () => {
            await doPin(folderToPin, ipfsController);
        }, 2000)

    })

}
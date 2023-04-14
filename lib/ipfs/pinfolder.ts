import { config } from "@/lib/config/config";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import { writeServerInfo } from "../logging/serverinfo";
import chokidar from "chokidar";

let debounceTimeout;
let lastCallTime = 0;

const throttle = (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const now = Date.now();
        const timeLeft = lastExecTime + delay - now;
        if (timeLeft > 0) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastExecTime = now;
                func.apply(this, args);
            }, timeLeft);
        } else {
            lastExecTime = now;
            func.apply(this, args);
        }
    };
};
const doPin = async (folderToPin, ipfsController) => {
    console.log("Starting Pin", process.pid);

    if (existsSync(folderToPin)) {
    } else {
        console.log(`Folder ${folderToPin} does not exist, creating...`);
        mkdirSync(folderToPin);
    }
    let CID = await ipfsController.publishDirectory(folderToPin);
    console.log("Pinned Folder: ", CID);
    await writeServerInfo({ ipfsCID: CID });

    if (!debounceTimeout) {
        debounceTimeout = setInterval(() => {
            doPin(folderToPin, ipfsController);
        }, config?.data?.ipfsTimeout || 1000 * 60 * 60 * 3);
    }
};

export const pinFolderInit = async (ipfsController) => {
    const folderToPin = resolve(__dirname, "..", config.data.fileSystemPath);

    await doPin(folderToPin, ipfsController);

    return chokidar.watch(folderToPin, {
        awaitWriteFinish: {
            stabilityThreshold: 5000,
            pollInterval: 5000,
        },
    }).on("all", throttle(() => {
        doPin(folderToPin, ipfsController);
    }, 5000))
}
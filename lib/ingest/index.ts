import { exists, existsSync, mkdirSync, unwatchFile } from 'node:fs';
import chokidar from "chokidar";
import { config } from "@/lib/config/config";
const ac = new AbortController();

let watchPath: string;

setTimeout(() => ac.abort(), 10000);
let queue: any = [];
export const init = (folder: string) => {
    if (!existsSync(folder)) {
        mkdirSync(folder);
    }
    watchPath = folder;
    chokidar.watch(folder).on("all", (event, filename) => {
        if (event === "add" && filename) {
            queue.push(filename);
        }
    });
}
export const getQueue = () => {
    return queue;
}
export const deinit = async () => {
    unwatchFile(watchPath);
}
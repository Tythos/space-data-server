import { exists, existsSync, mkdirSync, unwatchFile } from 'node:fs';
import chokidar from "chokidar";
import { config } from "@/lib/config/config";
import { promises as fs } from 'fs';

async function readDirectoryRecursively(dir: string): Promise<string[]> {
    const files = await fs.readdir(dir);
    const filePaths: string[] = [];

    for (const file of files) {
        const filePath = `${dir}/${file}`;
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) {
            filePaths.push(...await readDirectoryRecursively(filePath));
        } else {
            filePaths.push(filePath);
        }
    }

    return filePaths;
}
let watchPath: string;

let queue: any = [];
export const init = async (folder: string) => {
    if (!existsSync(folder)) {
        mkdirSync(folder);
    }
    queue = await readDirectoryRecursively(folder);
    watchPath = folder;
    chokidar.watch(folder).on("all", (event, filename) => {
        if (event === "add" && filename && ~queue.indexOf(filename)) {
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
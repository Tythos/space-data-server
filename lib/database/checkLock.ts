import { existsSync, readFileSync, rmSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import sConfig from "@/lib/database/config/static.config";

let { lockFilePath } = sConfig;

let otherProcessLock = true;

export const checkLock = async () => {
    while (otherProcessLock) {
        if (existsSync(lockFilePath)) {
            let isCurrentProcess;
            try { //HAAAAAAAACK
                isCurrentProcess = readFileSync(lockFilePath, "utf8") === process.pid.toString();
            } catch (e) {
                isCurrentProcess = true;
            }
            if (isCurrentProcess) {
                otherProcessLock = false;
            } else {
                try {
                    const stat = statSync(lockFilePath);
                    const now = new Date().getTime();
                    const timeDiff = now - stat.mtime.getTime();

                    if (timeDiff > 20000) {
                        unlinkSync(lockFilePath);
                        otherProcessLock = false;
                        break;
                    }
                } catch (e) {
                    otherProcessLock = false;
                }
            }
        } else {
            otherProcessLock = false;
        }
    }
    writeFileSync(lockFilePath, process.pid.toString());
}

export const removeLock = () => {
    try {
        rmSync(lockFilePath);
    } catch (e) {

    }
}
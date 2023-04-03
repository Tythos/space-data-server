import { connection } from "@/lib/database/connection";
import { config } from "@/lib/config/config";
import { join, resolve } from "path";
import { readdir, unlink } from "fs/promises";
import { checkLock, removeLock } from "@/lib/database/checkLock";

const cFP = config?.data?.fileSystemPath;
const fileReadPath = cFP && cFP[0] === "/" ?
    cFP : resolve(process.cwd(), cFP);

export const del = async (
    DCID: string = "no_id",
) => {
    try {
        let { CID: currentCID, PROVIDER, STANDARD } = (await connection("FILE_IMPORT_TABLE")
            .where("CID", "=", DCID)
            .first()) || { currentCID: "NOCID" };

        if (!STANDARD || !PROVIDER) return;
        const fileDelPath = join(fileReadPath, STANDARD, PROVIDER);
        const files = await readdir(fileDelPath);
        for (const file of files) {
            if (file.startsWith(currentCID)) {
                await unlink(join(fileDelPath, file));
            }
        }

        await checkLock();

        await connection(STANDARD).where("file_id", currentCID).del();

        await connection("FILE_IMPORT_TABLE")
            .where("CID", currentCID)
            .del();

        removeLock();
    } catch (e) {
        console.log(e)
        return false;
    }
    return true;
}

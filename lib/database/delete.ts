import { connection } from "@/lib/database/connection";
import { config } from "@/lib/config/config";
import { join, resolve } from "path";
import { readdir, unlink } from "fs/promises";

const cFP = config?.data?.fileSystemPath;
const fileReadPath = cFP && cFP[0] === "/" ?
    cFP : resolve(process.cwd(), cFP);

export const del = async (
    DCID: string = "no_id",
) => {

    let { CID: currentCID, PROVIDER, STANDARD } = (await connection("FILE_IMPORT_TABLE")
        .where("CID", "=", DCID)
        .first()) || { currentCID: "NOCID" };

    let isGone = true;

    const fileDelPath = join(fileReadPath, STANDARD, PROVIDER);
    const files = await readdir(fileDelPath);
    for (const file of files) {
        if (file.startsWith(currentCID)) {
            await unlink(join(fileDelPath, file));
        }
    }
    isGone = await connection(STANDARD).where("file_id", currentCID).del();
    await connection("FILE_IMPORT_TABLE")
        .where("CID", currentCID)
        .del();
    return true;
}

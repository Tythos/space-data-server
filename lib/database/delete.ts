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

    if (!PROVIDER) {
        return false;
    }

    let isGone;

    //if (config.data.useFileSystem) {
    const fileDelPath = join(fileReadPath, STANDARD, PROVIDER);
    const files = await readdir(fileDelPath);
    for (const file of files) {
        if (file.startsWith(currentCID)) {
            await unlink(join(fileDelPath, file));
        }
    }
    isGone = true;
    //} else {
    isGone = await connection(STANDARD).delete({ "file_id": currentCID });
    //}

    if (isGone) {
        isGone = isGone && await connection("FILE_IMPORT_TABLE")
            .where("CID", currentCID)
            .del();
    }
    return !!isGone;
}

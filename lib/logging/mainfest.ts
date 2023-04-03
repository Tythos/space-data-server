import { connection } from "../database/connection";
import { config } from "@/lib/config/config";
import { writeFileSync } from "fs";
import { join, resolve } from "path";
import { version, name } from "@/package.json";

interface IManifest {

}

const cFP = config?.data?.fileSystemPath;
const fileWritePath = cFP && cFP[0] === "/" ?
    cFP : resolve(process.cwd(), cFP);

export const writeManifest = async () => {
    let manifestRaw = (await connection('FILE_IMPORT_TABLE').select("*"));
    let manifest = {
        name,
        version
    };
    for (let e in manifestRaw) {
        let r = manifestRaw[e];
        manifest[r.STANDARD] = manifest[r.STANDARD] || {};
        let { CID, RECORD_COUNT, created_at } = r;
        manifest[r.STANDARD][r.PROVIDER] = manifest[r.STANDARD][r.PROVIDER] || [];
        manifest[r.STANDARD][r.PROVIDER].push({ CID, RECORD_COUNT, created_at });
    }
    console.log(`writing ${join(fileWritePath, "manifest.json")}`);
    writeFileSync(
        join(fileWritePath, "manifest.json"),
        JSON.stringify(manifest, null, 4)
    );
}
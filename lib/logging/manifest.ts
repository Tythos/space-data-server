import { connection } from "../database/connection";
import { writeFileSync } from "fs";
import { join } from "path";
import { version, name } from "@/package.json";
import { fileReadPath as fileWritePath } from "@/lib/config/config";

interface IManifest {
    name: string,
    version: string,
    [key: string]: any
}

export const writeManifest = async () => {

    let manifestRaw = (await connection('FILE_IMPORT_TABLE').select("*"));

    let manifest: IManifest = {
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

    writeFileSync(
        join(fileWritePath, "manifest.json"),
        JSON.stringify(manifest, null, 4)
    );
}
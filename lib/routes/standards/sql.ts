
import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { createReadStream } from "fs";
import { config } from "@/lib/config/config";
import { join, resolve } from "path";

const standardsJSON: KeyValueDataStructure = _standardsJSON;

export const sql = async (req: any, res: any, next: any) => {

    const filePath = resolve(join(config.database.path, "standards.sql"));
    const fileStream = createReadStream(
        filePath
    );
    fileStream.on('open', () => {
        fileStream.pipe(res);
    });
    fileStream.on('error', err => {
        next(err);
    });
};
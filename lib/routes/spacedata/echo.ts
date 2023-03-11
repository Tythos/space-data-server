import { Request, Response } from "express";
import * as express from "express";
import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { refRootName } from "@/lib/database/generateTables";
import { readFB } from "@/lib/utility/flatbufferConversion";
const standardsJSON: KeyValueDataStructure = _standardsJSON;

export const echo: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
    if (!Buffer.isBuffer(req.body)) {
        res.status(500);
        res.json({ error: `Unknown payload format.` });
    }
    let { standard } = req.params;
    standard = standard.toUpperCase();
    let currentStandard = standardsJSON[standard];
    let tableName = refRootName(currentStandard.$ref);
    let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
    let parentClass: any = standards[pClassName];
    res.json(readFB(req.body, tableName, parentClass));
    res.end();
    next();
};
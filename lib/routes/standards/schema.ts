import e, { Request, Response } from "express";
import * as express from "express";
import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import read from "@/lib/database/read";
import { writeFB } from "@/lib/utility/flatbufferConversion";
import { connection } from "@/lib/database/connection";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";

const standardsJSON: KeyValueDataStructure = _standardsJSON;

export const schema: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
    let { standard } = req.params;
    standard = standard.toUpperCase();
    if (!standardsJSON[standard]) {
        res.status(404);
    } else {
        res.end(JSON.stringify(standardsJSON[standard], null, 4));
    }
    next();
};
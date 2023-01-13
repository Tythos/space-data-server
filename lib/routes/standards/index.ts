import { Request, Response } from "express";
import * as express from "express";
import _standardsSchema from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";

const standardsSchema: KeyValueDataStructure = _standardsSchema;

export const standards: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
    const standard = req.params?.standard?.toUpperCase()
    if (standardsSchema[standard]) {
        res.set("content-type", "application/json; charset=utf-8");

        res.end(JSON.stringify(standardsSchema[standard], null, 4));
    } else {
        res.json(standardsSchema);
    }
    next();

}
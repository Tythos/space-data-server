import { Request, Response } from "express";
import * as express from "express";
import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import read from "@/lib/database/read";
import { connection } from "@/lib/database/connection";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { config } from "@/lib/config/config";
import { join, resolve } from "path";
import { createReadStream, existsSync, readFileSync } from "fs";
import { refRootName } from "@/lib/database/generateTables";
import { readFB, writeFB } from '@/lib/utility/flatbufferConversion';
import { resetIndex } from "apicache";

const standardsJSON: KeyValueDataStructure = _standardsJSON;
const cFP = config?.data?.fileSystemPath;
const fileReadPath = cFP && cFP[0] === "/" ?
    cFP : resolve(process.cwd(), cFP);

export const getSettings: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
    res.json(config);
}

export const cwd: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
    res.json({ cwd: process.cwd() });
}
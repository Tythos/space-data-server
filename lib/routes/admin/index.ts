import { Request, Response } from "express";
import * as express from "express";
import _standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { config } from "@/lib/config/config";
import { join, resolve } from "path";
import * as ethers from "ethers";
import { writeFileSync } from "node:fs";

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

export const saveSettings: express.RequestHandler = async (req: Request, res: Response, next: Function) => {

    const account = ethers.utils.verifyMessage(JSON.stringify(req.body), req.headers["authorization"] as any);
    if (req.authHeader?.trustedAddress?.trust === 255) {
        writeFileSync(join(process.cwd(), "config.json"), JSON.stringify(req.body, null, 4));
        setTimeout(() => {
            process.send?.("restartWorkers");
        }, 5000);
    }


}


import { Request, Response, RequestHandler } from "express";
import _standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { config } from "@/lib/config/config";
import { join, resolve } from "path";
import * as ethers from "ethers";
import { writeFileSync } from "node:fs";
import { TrustedAddress } from "@/lib/class/settings.interface";
import crypto from 'crypto';
import { AuthCIDHeader, encryptedMessage } from "@/lib/class/authheader.json.interface";
import eccrypto, { encrypt } from "@toruslabs/eccrypto";
import { IPC } from "@/lib/class/ipc.interface";

const standardsJSON: KeyValueDataStructure = _standardsJSON;
const cFP = config?.data?.fileSystemPath;
const fileReadPath = cFP && cFP[0] === "/" ?
    cFP : resolve(process.cwd(), cFP);

export const getSettings: RequestHandler = async (req: Request, res: Response, next: Function) => {

    if (req.authHeader?.trustedAddress?.isAdmin &&
        req.authHeader?.trustedAddress.publicKeyBuffer) {

        const { publicKeyBuffer } = req.authHeader?.trustedAddress;

        let sConfig = JSON.stringify(config);


        res.json({
            message: await eccrypto.encrypt(publicKeyBuffer, Buffer.from(sConfig))
        });

    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export const cwd: RequestHandler = async (req: Request, res: Response, next: Function) => {

    if (req.authHeader?.trustedAddress?.isAdmin &&
        req.authHeader?.trustedAddress.publicKeyBuffer) {

        const { publicKeyBuffer } = req.authHeader?.trustedAddress;

        res.json({ message: await eccrypto.encrypt(publicKeyBuffer, Buffer.from(process.cwd())) });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export const saveSettings: RequestHandler = async (req: Request, res: Response, next: Function) => {

    if (req.authHeader?.trustedAddress?.isAdmin) {
        writeFileSync(join(process.cwd(), "config.json"), JSON.stringify(req.body, null, 4));
        setTimeout(() => {
            process.send?.({ command: "restartWorkers" } as IPC);
        }, 5000);
    }
}

export const adminCheck: RequestHandler = async (req: Request, res: Response, next: Function) => {
    let admins = config.trustedAddresses
        .filter((tA: TrustedAddress) => tA.isAdmin)
        .map((tA: TrustedAddress) => ethers.sha256(tA.address.toLowerCase()).toLowerCase());
    res.json(admins);
};
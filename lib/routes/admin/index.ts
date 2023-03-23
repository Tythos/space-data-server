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

const standardsJSON: KeyValueDataStructure = _standardsJSON;
const cFP = config?.data?.fileSystemPath;
const fileReadPath = cFP && cFP[0] === "/" ?
    cFP : resolve(process.cwd(), cFP);

export const getSettings: RequestHandler = async (req: Request, res: Response, next: Function) => {

    if (req.authHeader?.trustedAddress?.isAdmin &&
        req.authHeader?.trustedAddress.publicKeyBuffer) {
        const { publicKeyBuffer } = req.authHeader?.trustedAddress;

        let sConfig = JSON.stringify(config);

        let encryptedMessage = await eccrypto.encrypt(publicKeyBuffer, Buffer.from(sConfig));

        res.json({
            payload: config,
            message: JSON.stringify(encryptedMessage)
        });

    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export const cwd: RequestHandler = async (req: Request, res: Response, next: Function) => {
    res.json({ cwd: process.cwd() });
}

export const saveSettings: RequestHandler = async (req: Request, res: Response, next: Function) => {

    if (req.authHeader?.trustedAddress?.isAdmin) {
        writeFileSync(join(process.cwd(), "config.json"), JSON.stringify(req.body, null, 4));
        setTimeout(() => {
            process.send?.("restartWorkers");
        }, 5000);
    }
}

export const adminCheck: RequestHandler = async (req: Request, res: Response, next: Function) => {
    let admins = config.trustedAddresses
        .filter((tA: TrustedAddress) => tA.isAdmin)
        .map((tA: TrustedAddress) => {
            const hasher = crypto.createHash('sha256');
            hasher.update(tA.address);
            return hasher.digest('hex');
        });
    res.json(admins);
};
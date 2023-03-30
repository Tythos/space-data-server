import { Request, Response, RequestHandler } from "express";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { config } from "@/lib/config/config";
import { join, resolve } from "path";
import * as ethers from "ethers";
import { writeFileSync } from "node:fs";
import { TrustedAddress } from "@/lib/class/settings.interface";
import { encrypt } from "@toruslabs/eccrypto";
import { COMMANDS, IPC } from "@/lib/class/ipc.interface";
import { ipcRequest } from "@/lib/utility/ipc";
import { decryptMessage, encryptMessage } from "@/lib/utility/encryption";

export const getSettings: RequestHandler = async (req: Request, res: Response, next: Function) => {

    if ((req as any).authHeader?.trustedAddress?.isAdmin &&
        (req as any).authHeader?.trustedAddress.publicKeyBuffer) {

        const { publicKeyBuffer } = (req as any).authHeader?.trustedAddress;

        res.json(await encryptMessage(publicKeyBuffer, JSON.stringify(config)));

    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export const cwd: RequestHandler = async (req: Request, res: Response, next: Function) => {

    if ((req as any).authHeader?.trustedAddress?.isAdmin &&
        (req as any).authHeader?.trustedAddress.publicKeyBuffer) {

        const { publicKeyBuffer, publicKey } = (req as any).authHeader?.trustedAddress;
        res.send(await encryptMessage(publicKeyBuffer, process.cwd()));
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export const saveSettings: RequestHandler = async (req: Request, res: Response, next: Function) => {


    if ((req as any).authHeader?.trustedAddress?.isAdmin) {
        try {
            const settings = await ipcRequest({
                command: COMMANDS["ETH:DECRYPT"],
                payload: req.body,
            } as IPC) as string;

            writeFileSync(join(process.cwd(), "config.json"), JSON.stringify(JSON.parse(settings), null, 4));
            res.status(200);
            res.end();
            setTimeout(() => {
                process.send?.({ command: COMMANDS["WORKERS:RESTART"] } as IPC);
            }, 1000);

        } catch (e) {
            res.status(500);
            res.end({ error: "Save Failed" });
        }
    } else {
        res.status(401);
        res.end({ error: "UnAuthorized" });
    }
}

export const adminCheck: RequestHandler = async (req: Request, res: Response, next: Function) => {
    let admins = config.trustedAddresses
        .filter((tA: TrustedAddress) => tA.isAdmin)
        .map((tA: TrustedAddress) => ethers.sha256(tA.address.toLowerCase()).toLowerCase());
    res.json(admins);
};

export const getServerPublicKey: RequestHandler = async (req: Request, res: Response, next: Function) => {
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify((await ipcRequest(
        {
            command: COMMANDS["ETH:SIGN"],
            payload: (new Date()).toISOString()
        } as IPC)), null, 4));
}
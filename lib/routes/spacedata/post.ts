import * as express from "express";
import standardsJSON from "@/lib/standards/schemas.json";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import * as ethers from "ethers";
import * as jose from "jose";
import { existsSync, mkdirSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import { config } from "@/lib/config/config"
import { join } from "path";

const errors = {
    sig: "Signature invalid or key missing."
};


if (!existsSync(config.data.ingest)) {
    mkdirSync(config.data.ingest);
}

const writeToDisk = async (vM: any, standard: string, extension: string, signature: string) => {
    const filePath = config.data.ingest;
    const fileName = await ipfsHash.of(vM.payload);

    if (!existsSync(filePath)) {
        await mkdir(filePath, { recursive: true });
    }

    let completePath = `${filePath}/${fileName}.${standard}.${extension}`;
    await writeFile(completePath, vM.payload);
    await writeFile(completePath + ".sig", signature);
}

export const verifySig = (msg: any, ethAddress: any, signature: any) => {
    let signingEthAccount = ethers.utils.verifyMessage(msg, signature).toLowerCase();
    if (!ethAddress) {
        ethAddress = signingEthAccount;
    }
    return (ethAddress.toLowerCase() === signingEthAccount) ? signingEthAccount : ""
}

// Middleware function that accepts FlatBuffer file
export const post: express.RequestHandler = async (req, res, next) => {
    const standard = req.params.standard.toUpperCase();
    if (!standardsJSON.hasOwnProperty(standard)) {
        res.status(500);
        res.json({ error: `Unknown standard.` });
    }
    if (!Buffer.isBuffer(req.body)) {
        res.status(500);
        res.json({ error: `Unknown payload format.` });
    }
    try {
        const authHeader: string[] = req.headers["authorization"]?.match(/^Bearer\s+(.+)$/i) || [];
        let jwsString: string = authHeader[1];
        let CID: string = "";
        let address: string = "";
        let signature: string = "";
        let isValidated: boolean = false;
        if (authHeader) {
            let { jwk, kid, signature: ethSignature } = jose.decodeProtectedHeader(jwsString);
            let ecJosePublicKey;
            ecJosePublicKey = await jose.importJWK({ ...jwk as any, crv: "secp256k1" }, "ES256");
            if (ecJosePublicKey) {
                const { payload: bCID } = await jose.compactVerify(jwsString, ecJosePublicKey);
                CID = bCID.toString();
            } else {
                res.status(401);
                res.json({ "error": errors.sig });
            }
            if (!await verifySig(CID, kid, ethSignature)) {
                res.status(401);
                res.json({ "error": errors.sig });
            } else {
                signature = ethSignature as string;
                address = kid!;
                isValidated = true;
            }
        }
        if (isValidated) {
            await writeToDisk({ payload: req.body }, standard, "fbs", signature);
            res.json({ CID });
            res.status(200);

        }
    } catch (e) {
        res.status(401);
        res.json({ "error": errors.sig });

    }
    next();
};
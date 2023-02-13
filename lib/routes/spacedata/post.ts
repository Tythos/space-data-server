import * as express from "express";
import standardsJSON from "@/lib/standards/schemas.json";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import * as ethers from "ethers";
import { existsSync, mkdirSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import { config } from "@/lib/config/config"

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

// Middleware function that accepts FlatBuffer file
export const post: express.RequestHandler = async (req, res, next) => {
    const standard = req.params.standard.toUpperCase();
    if (!standardsJSON.hasOwnProperty(standard)) {
        res.status(500);
        res.json({ error: `Unknown standard.` });
    }
    //console.log(req.body.toString())
    if (!Buffer.isBuffer(req.body)) {
        res.status(500);
        res.json({ error: `Unknown payload format.` });
    }
    try {
        const authHeader: string | undefined = req.headers["authorization"];
        let CID: string = "";
        let signature: string = "";
        let isValidated: boolean = false;

        if (authHeader) {
            const { CID, signature: inputSignature } = JSON.parse(Buffer.from(authHeader, "base64").toString());
            const address = ethers.utils.verifyMessage(CID, inputSignature).toLowerCase();
            if (!config.trustedAddresses[address]) {
                res.status(401);
                res.json({ "error": errors.sig });
            } else {
                isValidated = true;
                signature = inputSignature;
            }
        } else {
            res.status(401);
            res.json({ "error": errors.sig });
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
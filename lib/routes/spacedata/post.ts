import * as express from "express";
import standardsJSON from "@/lib/standards/schemas.json";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import * as ethers from "ethers";
import { existsSync, mkdirSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import { config } from "@/lib/config/config"
import type { AuthHeader } from "@/lib/class/authheader.json.interface";
import { connection } from "@/lib/database/connection";
import write from "@/lib/database/write";
import * as standards from "@/lib/standards/standards";
import { readFB } from "@/lib/utility/flatbufferConversion";

const errors = {
    sig: "Signature invalid or key missing."
};


if (!existsSync(config.data.ingest)) {
    mkdirSync(config.data.ingest);
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
        const authHeader: string | undefined = req.headers["authorization"];
        let CID: string = "";
        let signature: string = "";
        let isValidated: boolean = false;
        let address: string = "";
        if (authHeader) {
            const { CID: inputCID, signature: inputSignature }: AuthHeader = JSON.parse(Buffer.from(authHeader, "base64").toString());
            CID = inputCID;
            address = ethers.utils.verifyMessage(CID, inputSignature).toLowerCase();
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
            await write(
                connection,
                standard,
                readFB(req.body, standard, standards[standard]),
                standardsJSON[standard],
                CID,
                signature,
                address as string,
                standard.toUpperCase(),
                new Date()
            );
            res.json({ CID });
            res.status(200);
        }
    } catch (e) {
        res.status(401);
        res.json({ "error": errors.sig });
    }
    next();
};
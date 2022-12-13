import * as express from "express";
import write from "@/lib/database/write";
import { connection } from "@/lib/database/connection";
import standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import { sign } from "node:crypto";
const ethers = require('ethers');
import * as jose from "jose";
import { exists, existsSync, mkdirSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import { config } from "@/lib/config/config"
import { join } from "path"
if (!existsSync(config.filesystem.path)) {
    mkdirSync(config.filesystem.path);
}

const writeToDisk = async (vM: any, standard: string, kid: string, extension: string) => {
    const filePath = join(config.filesystem.path, standard, kid);
    const fileName = await ipfsHash.of(vM.payload);

    if (!existsSync(filePath)) {
        await mkdir(filePath, { recursive: true });
    }
    await writeFile(`${filePath}/${fileName}.${extension}`, vM.payload);
}

// Middleware function that accepts either a JSON or FlatBuffer file
export const post: express.RequestHandler = async (req, res, next) => {
    const standard = req.params.standard.toUpperCase();
    /*if (!standardsJSON.hasOwnProperty(standard)) {
        res.status(500);
        res.json({ error: `Unknown standard.` });
    }*/
    if (typeof req.body === "object" && !Array.isArray(req.body)) {
        // Convert the request body to a Buffer
        let verifiedMessages: KeyValueDataStructure = {};
        for (let s = 0; s < req.body.signatures.length; s++) {
            let signature = req.body.signatures[s];
            try {
                if (signature.header?.kid) {
                    let pHeader = JSON.parse((Buffer.from(signature.protected, "base64")).toString());
                    let publicKey = await jose.importJWK(pHeader.jwk, pHeader.alg);
                    verifiedMessages[signature.header.kid] = await jose.generalVerify(req.body, publicKey as any);
                    await writeToDisk(verifiedMessages[signature.header.kid], standard, signature.header.kid, "json");
                    /**
                     * Write each file to disk as in folder {root}/{standard}/{ethAddress}/{ipfshash}.{filetype}
                     * Write metadata file to disk
                     */
                    res.json(Object.keys(verifiedMessages));
                } else {
                    throw Error("No Signature Found");
                }

            } catch (e) {
                res.status(500);
                res.json({ error: `Signature invalid or key missing.`, e });
            }
        }
    } else if (Buffer.isBuffer(req.body)) {
        console.log(req.body)
    }
    next();
};
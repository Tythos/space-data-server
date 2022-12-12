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


// Middleware function that accepts either a JSON or FlatBuffer file
export const post: express.RequestHandler = async (req, res, next) => {
    const standard = req.params.standard.toUpperCase();
    // Convert the request body to a Buffer
    // const data = Buffer.from(req.body);
    let verifiedMessages: KeyValueDataStructure = {};
    for (let s = 0; s < req.body.signatures.length; s++) {
        let signature = req.body.signatures[s];
        try {
            if (signature.header.kid) {
                let pHeader = JSON.parse((Buffer.from(signature.protected, "base64")).toString());
                let publicKey = await jose.importJWK(pHeader.jwk, pHeader.alg);
                verifiedMessages[signature.header.kid] = await jose.generalVerify(req.body, publicKey as any);
            }
            res.json(Object.keys(verifiedMessages));
        } catch (e) {
            res.status(500);
            res.json({ error: `Signature invalid or key missing.` });
        }
    }
    next();
};
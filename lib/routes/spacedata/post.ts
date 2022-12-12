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

    for (let s = 0; s < req.body.signatures.length; s++) {
        let signature = req.body.signatures[s];
        try {
            let publicKey = await jose.importJWK(signature.header.jwk, signature.header.alg);
            const { payload, unprotectedHeader } = await jose.generalVerify(req.body, publicKey as any);
        } catch (e) {
            res.status(500);
            res.json({ error: `Signature invalid or key missing.` });
        }
    }
    res.send();
    next();
    /*
    let CID: string = await ipfsHash.of(data);

    if (req.headers["signature"]) {
        const { keyId, signature } = req.headers["signature"] as any;
        // Get the message that was signed from the request body
        const message = req.body.message;

        // Use ethers.js to create a signature object from the signature and keyId
        const sig = new ethers.Signature(signature, keyId);

        // Verify the signature using the message and the signature object
        const verified = sig.verifyMessage(message);
        if (!verified || keyId !== sig.recoverAddress(message)) {
            res.status(403).end('Invalid signature');
        }
    }
    // Check if the request body is a JSON object

    if (typeof req.body === "object" && !Array.isArray(req.body)) {
        // Write the JSON object to the database
        write(connection, standard, req.body.RECORDS, (standardsJSON as KeyValueDataStructure)[standard], CID, "null");
    } else if (Buffer.isBuffer(req.body)) {

    } else {
        // Return an error if the request body is not a JSON object or FlatBuffer file
        next(new Error("Invalid request body"));
    }*/
};
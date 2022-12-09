import * as express from "express";
import write from "@/lib/database/write";
import { connection } from "@/lib/database/connection";
import standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
const ethers = require('ethers');


// Middleware function that accepts either a JSON or FlatBuffer file
export const post: express.RequestHandler = async (req, res, next) => {
    const standard = req.params.standard.toUpperCase();
    // Convert the request body to a Buffer
    // const data = Buffer.from(req.body);
    //console.log(JSON.stringify(req.body));
    res.send({"test":"test"});
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
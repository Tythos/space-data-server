import * as express from "express";
import write from "@/lib/database/write";
import { connection } from "@/lib/database/connection";
import standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";

// Middleware function that accepts either a JSON or FlatBuffer file
export const writeToDatabase: express.RequestHandler = async (req, res, next) => {
    // Convert the request body to a Buffer
    const data = Buffer.from(req.body);
    let CID: string = await ipfsHash.of(data);

    // Check if the request body is a JSON object
    const standard = req.params.standard.toUpperCase();
    if (typeof req.body === "object" && !Array.isArray(req.body)) {
        // Write the JSON object to the database
        write(connection, standard, req.body.RECORDS, (standardsJSON as KeyValueDataStructure)[standard], CID, null);
    } else if (Buffer.isBuffer(req.body)) {

    } else {
        // Return an error if the request body is not a JSON object or FlatBuffer file
        next(new Error("Invalid request body"));
    }
};
export const post = async (req: Request, res: Response, next: Function) => {
    next();
}

import express, { RequestHandler, Request, Response, NextFunction } from 'express';
import standardsJSON from "@/lib/standards/schemas.json";
import { existsSync, mkdirSync } from "node:fs";
import { config } from "@/lib/config/config"
import { connection } from "@/lib/database/connection";
import write from "@/lib/database/write";
import * as standards from "@/lib/standards/standards";
import { readFB } from "@/lib/utility/flatbufferConversion";
import { AuthCIDHeader } from '@/lib/class/authheader.json.interface';

const errors = {
    sig: "Signature invalid or key missing."
};

if (!existsSync(config.data.ingest)) {
    mkdirSync(config.data.ingest);
}

// Middleware function that accepts FlatBuffer file
export const post: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const standard = req.params.standard.toUpperCase();
    if (!standardsJSON.hasOwnProperty(standard)) {
        res.status(500);
        res.json({ error: `Unknown standard.` });
    }

    if (!Buffer.isBuffer(req.body)) {
        res.status(500);
        res.json({ error: `Unknown payload format.` });
    }
    if (req.authHeader) {
        try {
            let { CID, trustedAddress } = (req.authHeader as AuthCIDHeader);

            if (req.authHeader) {
                await write(
                    connection,
                    standard,
                    readFB(req.body, standard, standards[standard]),
                    standardsJSON[standard],
                    CID,
                    req.headers['x-auth-signature'] as string,
                    trustedAddress?.address as string,
                    standard.toUpperCase(),
                    new Date()
                );
                res.json({ CID });
                res.status(200);
            }
        } catch (e) {
            res.status(400);
            res.json({ "error": e?.toString() });
        }
    } else {
        res.status(400);
        res.json({
            "error": 'Missing required headers: authorization and/or x-auth-signature'
        });
    }
    next();
};
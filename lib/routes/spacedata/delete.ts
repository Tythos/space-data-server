import express, { Request, Response } from 'express';
import { del as _del } from "@/lib/database/delete";
import { AuthCIDHeader } from "@/lib/class/authheader.json.interface";

const errors = {
    sig: "Signature invalid or key missing."
};

export const del: express.RequestHandler = async (req: Request, res: Response, next: Function) => {

    try {

        let { CID } = (req.authHeader as AuthCIDHeader);

        if (req.authHeader) {
            let isDeleted = _del(CID);
            res.json({ CID, isDeleted });
            res.status(200);

        } else {
            res.status(401);
            res.json({ "error": errors.sig });
        }
    } catch (e) {
        res.status(401);
        res.json({ "error": errors.sig });

    }
}

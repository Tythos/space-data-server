import * as express from "express";
import { Request, Response } from "express";
import * as standards from "@/lib/standards/standards";
import { del as _del } from "@/lib/database/delete";
import * as ethers from "ethers";
import type { AuthHeader } from "@/lib/class/authheader.json.interface";
import { config } from "@/lib/config/config";
import type { trustedAddress } from "@/lib/class/settings.interface"

const errors = {
    sig: "Signature invalid or key missing."
};

export const del: express.RequestHandler = async (req: Request, res: Response, next: Function) => {

    const authHeader: string | undefined = req.headers["authorization"];
    let CID: string = "";
    let signature: string = "";
    let isValidated: boolean = false;

    try {
        if (authHeader) {
            const { CID: inputCID, signature: inputSignature }: AuthHeader = JSON.parse(Buffer.from(authHeader, "base64").toString());
            CID = inputCID;
            const address = ethers
                .utils
                .verifyMessage(CID, inputSignature)
                .toLowerCase();

            if (!config.trustedAddresses.find((obj: trustedAddress) => obj.address === address)) {
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
            let isDeleted = _del(CID);
            res.json({ CID, isDeleted });
            res.status(200);

        }
    } catch (e) {
        res.status(401);
        res.json({ "error": errors.sig });

    }
}

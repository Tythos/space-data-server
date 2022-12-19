import * as express from "express";
import standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import * as ethers from "ethers";
import Web3Token from "web3-token";
import * as jose from "jose";
import { existsSync, mkdirSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import { config } from "@/lib/config/config"
import { join } from "path";

if (!existsSync(config.data.ingest)) {
    mkdirSync(config.data.ingest);
}

const checkAccount = (ethAddress: string) => {
    let check = (config.trustedAddresses[ethAddress.toLowerCase()]);
    //TODO stub
    return (config.trustedAddresses[ethAddress.toLowerCase()]?.trust === 4);
}

const writeToDisk = async (vM: any, standard: string, ethereumAddress: string, extension: string, signature: string) => {
    const filePath = config.data.ingest;
    const fileName = await ipfsHash.of(vM.payload);

    if (!existsSync(filePath)) {
        await mkdir(filePath, { recursive: true });
    }
    let completePath = `${filePath}/${fileName}.${standard}.${extension}`;
    await writeFile(completePath, vM.payload);
    await writeFile(completePath + ".sig", signature);
}

export const verifySig = (msg: any, ethAddress: any, signature: any) => {
    let signingEthAccount = ethers.utils.verifyMessage(msg, signature).toLowerCase();
    if (!ethAddress) {
        ethAddress = signingEthAccount;
    }
    console.log(ethAddress, signingEthAccount)
    return (checkAccount(ethAddress) && (ethAddress.toLowerCase() === signingEthAccount)) ? signingEthAccount : ""
}

const checkToken = async (req: express.Request, useRaw: boolean = true) => {
    const { address, body } = await Web3Token.verify((req.headers["authorization"] || "").toString());
    let [CID, SIG] = body.statement.split(":");
    return verifySig(CID, address, SIG) ? { address, signature: SIG } : {};
}

const sendError = (e: any, res: express.Response) => {
    res.status(~(e || "").toString().indexOf("Unauthorized") ? 401 : 500);
    res.json({ error: `Signature invalid or key missing.`, e });
}
// Middleware function that accepts either a JSON or FlatBuffer file
export const post: express.RequestHandler = async (req, res, next) => {
    const standard = req.params.standard.toUpperCase();
    if (!standardsJSON.hasOwnProperty(standard)) {
        res.status(500);
        res.json({ error: `Unknown standard.` });
    }

    if (!Buffer.isBuffer(req.body) && typeof req.body === "object" && !Array.isArray(req.body)) {
        if (req.body?.signatures) {
            let verifiedMessages: KeyValueDataStructure = {};

            for (let s = 0; s < req.body.signatures.length; s++) {
                let signature = req.body.signatures[s];
                if (!signature.header) {
                    sendError("Unauthorized", res);
                    return;
                }
                let { kid, signature: ethSignature } = signature.header;
                try {
                    if (signature.header?.kid && checkAccount(kid)) {
                        let pHeader = JSON.parse((Buffer.from(signature.protected, "base64")).toString());
                        let publicKey = await jose.importJWK(pHeader.jwk, pHeader.alg);
                        verifiedMessages[kid] = await jose.generalVerify(req.body, publicKey as any);

                        if (verifySig(await ipfsHash.of(verifiedMessages[kid].payload), kid, ethSignature)) {
                            await writeToDisk(verifiedMessages[signature.header.kid], standard, signature.header.kid, "json", ethSignature);
                        } else {
                            sendError("Bad ETH Signature", res);
                        }

                        /**
                         * Write each file to disk as in folder {root}/{standard}/{ethAddress}/{ipfshash}.{filetype}
                         * ipfsHash.sig
                         */

                        res.json(Object.keys(verifiedMessages));
                    } else {
                        throw Error("Unauthorized");
                    }

                } catch (e) {
                    sendError(e, res);
                }
            }
        } else if (req.headers.authorization) {
            let { address, signature } = await checkToken(req);
            if (address) {
                await writeToDisk({ payload: (req as any).rawBody }, standard, address, "json", signature);
                res.json({})
            } else {
                sendError("Unauthorized", res);
            }
        }
    } else if (Buffer.isBuffer(req.body)) {
        let { address, signature } = await checkToken(req, false);

        if (address) {
            await writeToDisk({ payload: req.body }, standard, address, "fbs", signature);
            res.json({});
        } else {
            sendError("Unauthorized", res);
        }
    }
    next();
};
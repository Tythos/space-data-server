import express, { Request, Response, NextFunction } from 'express';
import { verifyMessage, hashMessage, SigningKey } from 'ethers';
import { AuthCIDHeader, AuthSettingsHeader } from '../class/authheader.json.interface';
import { config } from '../config/config';
import { TrustedAddress, TrustedUser } from '../class/settings.interface';

const app = express();
export const getTrustedAddress = (address) => config.trustedUsers.find((obj: TrustedUser) => obj.address.toLowerCase() === address.toLowerCase())

// Middleware
export const validateHeaders = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const signatureHeader = req.headers['x-auth-signature'];

    req.authHeader = undefined;

    if (authHeader && signatureHeader) {

        let authHeaderObj: AuthCIDHeader | AuthSettingsHeader;

        try {
            const decodedData = Buffer.from(authHeader, 'base64').toString();
            authHeaderObj = JSON.parse(decodedData);
        } catch (error) {
            return res.status(400).json({
                error: 'Invalid authorization header. Expected a base64 stringified JSON',
            });
        }

        //Nonce Check
        const nonceDelta = Date.now() - authHeaderObj.nonce;
        if (nonceDelta > config.nonceTimeout) {

            return res.status(401).json({
                error: 'Invalid nonce value',
            });

        } else {

            try {
                const recoveredAddress = verifyMessage(authHeader, signatureHeader as any);
                const msgHash = hashMessage(authHeader);
                const trustedAddress = { ...getTrustedAddress(recoveredAddress) };
                if (!trustedAddress) {
                    return res.status(401).json({
                        error: 'Invalid x-auth-signature. Signature does not match the provided Ethereum address',
                    });
                } else {
                    trustedAddress.publicKey = SigningKey.recoverPublicKey(msgHash, signatureHeader as any);
                    trustedAddress.publicKeyBuffer = Buffer.from(trustedAddress.publicKey.slice(2,), "hex");
                    authHeaderObj.trustedAddress = trustedAddress as any;
                    req.authHeader = { ...authHeaderObj };
                }
            } catch (error) {
                console.log(error)
                return res.status(400).json({
                    error: 'Error verifying the x-auth-signature',
                });
            }
        }
    }
    next();
};
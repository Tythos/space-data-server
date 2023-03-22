import express, { Request, Response, NextFunction } from 'express';
import { ethers } from 'ethers';
import { AuthCIDHeader, AuthSettingsHeader } from '../class/authheader.json.interface';
import { config } from '../config/config';
import { TrustedAddress } from '../class/settings.interface';

const app = express();
export const getTrustedAddress = (address) => config.trustedAddresses.find((obj: TrustedAddress) => obj.address.toLowerCase() === address.toLowerCase())

// Middleware
export const validateHeaders = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const signatureHeader = req.headers['x-auth-signature'];

    if (authHeader && signatureHeader) {

        let authHeaderObj: AuthCIDHeader | AuthSettingsHeader;

        try {
            const decodedData = Buffer.from(authHeader, 'base64').toString();
            authHeaderObj = JSON.parse(decodedData);
            //console.log(authHeaderObj.nonce);
        } catch (error) {
            return res.status(400).json({
                error: 'Invalid authorization header. Expected a base64 stringified JSON',
            });
        }


        try {
            const recoveredAddress = ethers.utils.verifyMessage(authHeader, signatureHeader as any);
            const trustedAddress = getTrustedAddress(recoveredAddress);
            if (!trustedAddress) {
                return res.status(401).json({
                    error: 'Invalid x-auth-signature. Signature does not match the provided Ethereum address',
                });
            } else {
                authHeaderObj.trustedAddress = trustedAddress;
                req.authHeader = { ...authHeaderObj };
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: 'Error verifying the x-auth-signature',
            });
        }
    }
    next();
};
import request from "supertest";
const dataPath: string = `test/output/data/`;
import { app } from "@/lib/worker/app";
import { config } from "@/lib/config/config";
import crypto from "crypto";
//@ts-ignore
import { TrustedAddress } from "@/lib/class/settings.interface";
import { ethWallet } from "@/test/utility/generate.crypto.wallets";
import { AuthHeader } from "@/lib/class/authheader.json.interface";
import eccrypto from "@toruslabs/eccrypto";

describe('Test Admin Paths', () => {
    test('Identifies admin accounts', async () => {
        let admins = config.trustedAddresses
            .filter((tA: TrustedAddress) => tA.isAdmin)
            .map((tA: TrustedAddress) => {
                const hasher = crypto.createHash('sha256');
                hasher.update(tA.address);
                return hasher.digest('hex');
            });
        const adminCheck = (await request(app).get(
            `/admincheck`)
            .set("accept", "application/json")).body;
        expect(adminCheck).toEqual(admins);
    });
    test('Retrieves configuration', async () => {
        let admins = config.trustedAddresses
            .filter((tA: TrustedAddress) => tA.isAdmin)
            .map((tA: TrustedAddress) => {
                const hasher = crypto.createHash('sha256');
                hasher.update(tA.address);
                return hasher.digest('hex');
            });

        const noAuthSettings = (await request(app).get(
            `/admin/settings`)
            .set("accept", "application/json"));
        expect(noAuthSettings.statusCode).toEqual(401);

        const authMessage: AuthHeader = { nonce: Date.now() };
        const authHeader = Buffer.from(JSON.stringify(authMessage)).toString("base64");
        const authSignature = await ethWallet.signMessage(authHeader);

        const settings = (await request(app).get(
            `/admin/settings`)
            .set("authorization", authHeader)
            .set("x-auth-signature", authSignature)
            .set("accept", "application/json")).body;

        let decryptedSettings = await eccrypto.decrypt(
            Buffer.from(ethWallet.privateKey.slice(2,), "hex"),
            JSON.parse(settings.message, (key, value) => {
                if (typeof value === "object" &&
                    value.type === "Buffer" && value?.data?.length) {
                    return Buffer.from(value);
                } else {
                    return value;
                }
            }));

        expect(decryptedSettings.toString()).toEqual(JSON.stringify(config));

    });

});
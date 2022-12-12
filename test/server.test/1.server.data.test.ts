import request from "supertest";
import { generateData } from "../utility/generate.test.data";
const dataPath: string = `test/output/data/`;
import { app } from "@/lib/worker/app";
import * as standards from "@/lib/standards/standards";
import { extname, join } from "node:path";
import { readFileSync } from "node:fs";
import { ethWallet, btcWallet, btcAddress } from "@/test/utility/generate.crypto.wallets";
import * as jose from "jose";
import { keyconvert } from "@/packages/keyconvert";

beforeAll(() => {

})

describe("POST /endpoint", () => {

    it("should accept JSON and Flatbuffer files and save them to the database", async () => {
        const outputStandardFiles: any = {};
        const outputPaths = await generateData(10, dataPath);
        outputPaths.forEach((p: any) => {
            let _file = p[0].split("/").pop();
            let standard = p[0].split("/").pop().substring(0, 3);
            outputStandardFiles[standard] = outputStandardFiles[standard] || {};
            outputStandardFiles[standard][extname(_file).replace(".", "")] = _file;
        });

        for (let standard in standards) {
            let ethKeyConvert = new keyconvert({ kty: "EC", name: "ECDSA", namedCurve: "K-256", hash: "SHA-256" } as any);
            await ethKeyConvert.import(ethWallet.privateKey, "hex");
            expect(await ethKeyConvert.publicKeyHex()).toEqual(ethWallet.publicKey.slice(2,));
            let jwkETHPrivate = await ethKeyConvert.export("jwk", "private");
            let jwkETHPublic = await ethKeyConvert.export("jwk", "public");

            const ecJosePrivateKey = await jose.importJWK({ ...jwkETHPrivate as any, crv: "secp256k1" }, "ES256");
            const ecJosePublicKey = await jose.importJWK({ ...jwkETHPublic as any, crv: "secp256k1" }, "ES256");

            const ecJWKExportPrivateKey = await jose.exportJWK(ecJosePrivateKey);
            const ecJWKExportPublicKey = await jose.exportJWK(ecJosePublicKey);

            await ethKeyConvert.import(ecJWKExportPrivateKey, "jwk");
            expect(ethWallet.publicKey.slice(2,)).toEqual(await ethKeyConvert.export("hex", "public"));
            const jsonFileString = readFileSync(join(dataPath, outputStandardFiles[standard].json), "utf8");
            const jsonFile = JSON.parse(jsonFileString);
            expect(JSON.stringify(jsonFile)).toEqual(jsonFileString);

            /**
             * Support for:
             * - EIP-4361 signed messages (https://github.com/ethereum/EIPs/blob/master/EIPS/eip-4361.md)
             * - JOSE signed messages     (https://datatracker.ietf.org/doc/rfc7515/)
             */

            const jweNoKey = await new jose
                .GeneralSign(new TextEncoder().encode(jsonFileString))
                .addSignature(ecJosePrivateKey)
                .setUnprotectedHeader({ alg: "ES256K", })
                .sign();

            const jwe = await new jose
                .GeneralSign(new TextEncoder().encode(jsonFileString))
                .addSignature(ecJosePrivateKey)
                .setUnprotectedHeader({ jwk: ecJWKExportPublicKey, kid: ethWallet.address, alg: "ES256K", })
                .sign();

            const { payload, unprotectedHeader } = await jose.generalVerify(jwe, ecJosePublicKey);
            expect(payload.toString()).toEqual(jsonFileString);
            const jsonResponseError = await request(app)
                .post(`/spacedata/${standard}`)
                .send(jweNoKey);
            expect(jsonResponseError.status).toBe(500);

            expect(jsonResponseError.body).toMatchObject({ error: `Signature invalid or key missing.` });
            const jsonResponse = await request(app)
                .post(`/spacedata/${standard}`)
                .send(jwe)
            expect(jsonResponse.status).toBe(200);
        }

    }, 10000);
});

afterAll(() => {



})
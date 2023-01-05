import request from "supertest";
import { generateData } from "../utility/generate.test.data";
const dataPath: string = `test/output/data/`;
import { app } from "@/lib/worker/app";
import * as standards from "@/lib/standards/standards";
import { dirname, extname, join } from "node:path";
import { existsSync, readFileSync, rmdirSync, rmSync } from "node:fs";
import { ethWallet, untrustedEthWallet, btcWallet, btcAddress } from "@/test/utility/generate.crypto.wallets";
import * as jose from "jose";
import { keyconvert, pubKeyToEthAddress } from "@/packages/keyconvert";
import Web3Token from 'web3-token';
import { connection } from "@/lib/database/connection";
import { config } from "@/lib/config/config"
import standardsJSON from "@/lib/standards/schemas.json";
import { JSONSchema4 } from "json-schema";

//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import { init, getQueue, deinit } from "@/lib/ingest/index";
import { generateDatabase } from "@/lib/database/generateTables";

//@ts-ignore
var databaseConfig = config.database.config[config.database.config.primary];
const sqlfilename = join(dirname(databaseConfig.connection.filename), "standards.sql");

const outputStandardFiles: any = {};
let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON as any);

beforeAll(async () => {
    if (!existsSync(databaseConfig.connection.filename)) {
        await generateDatabase(standardsArray, databaseConfig.connection.filename, `${config.database.path}/standards.sql`, connection, databaseConfig.version);
    }
    await init(config.data.ingest);
    const outputPaths = await generateData(1, dataPath);
    outputPaths.forEach((p: any) => {
        let _file = p[0].split("/").pop();
        let standard = p[0].split("/").pop().substring(0, 3);
        outputStandardFiles[standard] = outputStandardFiles[standard] || {};
        let fileRef = outputStandardFiles[standard][extname(_file).replace(".", "")];
        if (fileRef) {
            fileRef = [fileRef];
        }
        outputStandardFiles[standard][extname(_file).replace(".", "")] = _file;
    });
})

describe("POST /endpoint", () => {
    rmSync(config.data.ingest, { recursive: true, force: true });

    it("should accept JSON and Flatbuffer files and save them to the database", async () => {
        for (let standard in standards) {
            if (standard !== "OMM") continue;
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

            let fileBuff = new TextEncoder().encode(jsonFileString);
            const jweNoKey = await new jose
                .GeneralSign(fileBuff)
                .addSignature(ecJosePrivateKey)
                .setProtectedHeader({ alg: "ES256K" })
                .sign();

            const jwe = await new jose
                .GeneralSign(fileBuff)
                .addSignature(ecJosePrivateKey)
                .setUnprotectedHeader({ kid: ethWallet.address, signature: await ethWallet.signMessage(await ipfsHash.of(fileBuff)) })
                .setProtectedHeader({ jwk: ecJWKExportPublicKey, alg: "ES256K" })
                .sign();

            const { payload } = await jose.generalVerify(jwe, ecJosePublicKey);
            expect(payload.toString()).toEqual(jsonFileString);
            const jsonResponseError = await request(app)
                .post(`/spacedata/${standard}`)
                .send(jweNoKey);

            expect(jsonResponseError.status).toBe(401);

            expect(jsonResponseError.body.error).toMatch(`Signature invalid or key missing.`);
            const jsonResponse = await request(app)
                .post(`/spacedata/${standard}`)
                .send(jwe);
            expect(jsonResponse.status).toBe(200);

            const ipfsCIDJSON = await ipfsHash.of(fileBuff);
            let statement = `${ipfsCIDJSON}:${await ethWallet.signMessage(ipfsCIDJSON)}`;

            const jsonToken = await Web3Token.sign(async (msg: any) => await ethWallet.signMessage(msg), {
                statement,
                expires_in: '1 day',
                nonce: performance.now(),
            });

            const jsonResponseEIP4361 = await request(app)
                .post(`/spacedata/${standard}`)
                .set("authorization", jsonToken)
                .send(jsonFile);
            expect(jsonResponseEIP4361.status).toBe(200);

            const flatbuffer: Buffer = readFileSync(join(dataPath, outputStandardFiles[standard].fbs));
            const ipfsCIDFBS = await ipfsHash.of(flatbuffer);

            statement = `${ipfsCIDFBS}:${await ethWallet.signMessage(ipfsCIDFBS)}`;

            const fbToken = await Web3Token.sign(async (msg: any) => await ethWallet.signMessage(msg), {
                statement,
                expires_in: '1 day',
                nonce: performance.now(),
            });

            const fbResponseEIP4361 = await request(app)
                .post(`/spacedata/${standard}`)
                .set("authorization", fbToken)
                .set('Content-Type', 'application/octet-stream')
                .send(flatbuffer);
            expect(fbResponseEIP4361.status).toBe(200);

            //Untrusted Wallet
            const ufbToken = await Web3Token.sign(async (msg: any) => await untrustedEthWallet.signMessage(msg), {
                statement,
                expires_in: '1 day',
                nonce: performance.now(),
            });

            const ufbResponseEIP4361 = await request(app)
                .post(`/spacedata/${standard}`)
                .set("authorization", ufbToken)
                .set('Content-Type', 'application/octet-stream')
                .send(flatbuffer);
            expect(ufbResponseEIP4361.status).toBe(401);
        }
        await new Promise(r => setTimeout(r, 5000));
    }, 30000);
});

afterAll(async () => {
    await deinit();
    //rmSync(config.data.ingest, { recursive: true, force: true });
});
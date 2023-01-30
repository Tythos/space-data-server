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
import { connection } from "@/lib/database/connection";
import { config } from "@/lib/config/config"
import standardsJSON from "@/lib/standards/schemas.json";
import { JSONSchema4 } from "json-schema";
import { get, post } from "@/lib/routes/spacedata";

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
            //if (standard !== "OMM") continue;
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
             * JOSE signed messages     (https://datatracker.ietf.org/doc/rfc7515/)
             */

            let jsonBinary: Uint8Array = new TextEncoder().encode(jsonFileString);
            const flatbufferBinary: Buffer = readFileSync(join(dataPath, outputStandardFiles[standard].fbs));

            const ipfsCIDJSON = await ipfsHash.of(jsonBinary);
            const ipfsCIDFB = await ipfsHash.of(flatbufferBinary);

            /*Fail Test*/

            const jwsF = await new jose.CompactSign(
                new TextEncoder().encode(ipfsCIDFB)
            )
                .setProtectedHeader({
                    jwk: {},
                    alg: 'ES256K',
                    kid: ethWallet.address,
                    signature: ""
                })
                .sign(ecJosePrivateKey);


            const jsonResponseError = await request(app)
                .post(`/spacedata/${standard}`)
                .set("Content-Type", "application/octet-stream")
                .set("authorization", `Bearer ${jwsF}`)
                .send(flatbufferBinary);

            expect(jsonResponseError.status).toBe(401);

            expect(jsonResponseError.body.error).toMatch(`Signature invalid or key missing.`);

            const jws = await new jose.CompactSign(
                new TextEncoder().encode(ipfsCIDFB)
            )
                .setProtectedHeader({
                    jwk: jwkETHPublic as any,
                    alg: 'ES256K',
                    kid: ethWallet.address,
                    signature: await ethWallet.signMessage(ipfsCIDFB)
                })
                .sign(ecJosePrivateKey);

            const { payload: payloadFB } = await jose.compactVerify(jws, ecJosePublicKey);
            expect(payloadFB.toString()).toEqual(ipfsCIDFB);
            const fbResponse = await request(app)
                .post(`/spacedata/${standard}`)
                .set("Content-Type", "application/octet-stream")
                .set("authorization", `Bearer ${jws}`)
                .send(flatbufferBinary);
            expect(fbResponse.status).toBe(200);

            const postedCID = await request(app)
                .get(`/cid/${ethWallet.address}/${standard}/true`);
            console.log(postedCID.body);

        }
        await new Promise(r => setTimeout(r, 5000)); //!IMPORTANT
    }, 30000);
});

afterAll(async () => {
    await deinit();
    //rmSync(config.data.ingest, { recursive: true, force: true });
});
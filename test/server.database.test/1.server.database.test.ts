jest.useFakeTimers();

import request from "supertest";
import { generateData } from "../utility/generate.test.data";
const dataPath: string = `test/output/data/`;
import { app } from "@/lib/worker/app";
import * as standards from "@/lib/standards/standards";
import path, { dirname, extname, join } from "node:path";
import { exists, existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, rmSync } from "node:fs";
import { ethWallet } from "@/test/utility/generate.crypto.wallets";
import { connection } from "@/lib/database/connection";
import { config } from "@/lib/config/config"
import standardsJSON from "@/lib/standards/schemas.json";
import { JSONSchema4 } from "json-schema";
import type { AuthHeader } from "@/lib/class/authheader.json.interface";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import { init, deinit } from "@/lib/ingest/index";
import { generateDatabase } from "@/lib/database/generateTables";
import { readFB } from "@/lib/utility/flatbufferConversion";

//@ts-ignore
var databaseConfig = config.database.config[config.database.config.primary];
const sqlfilename = join(dirname(databaseConfig.connection.filename), "standards.sql");

const outputStandardFiles: any = {};
let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON as any);

beforeAll(async () => {

    let testdbPath: any = path.dirname(databaseConfig.connection.filename).split(path.sep).pop();

    if (existsSync(testdbPath)) {
        rmdirSync(testdbPath, { recursive: true });
        mkdirSync(testdbPath);
    }

    try {
        if (existsSync(config.data.fileSystemPath)) {
            rmdirSync(config.data.fileSystemPath, { recursive: true });
        }
    } catch (e) {
        throw new Error(`Could not delete ${config.data.fileSystemPath}`);
    }

    if (!existsSync(databaseConfig.connection.filename)) {
        await generateDatabase(standardsArray, databaseConfig.connection.filename, `${config.database.path}/standards.sql`, connection, databaseConfig.version);
    }

    await init(config.data.ingest);

    await generateData(3, 2, dataPath);

    const fileNames = readdirSync(dataPath);
    for (let fileName of fileNames) {
        let [CID, standard, ext] = fileName.split('.');
        if (ext === "fbs") {
            standard = standard.toUpperCase();
            outputStandardFiles[standard] = outputStandardFiles[standard] || [];
            outputStandardFiles[standard][CID] = readFileSync(join(dataPath, fileName));
        }
    }

});

describe("POST /endpoint Write To FileSystem", () => {
    rmSync(config.data.ingest, { recursive: true, force: true });

    it("should accept Flatbuffer files and save them to the database", async () => {
        for (let standard in standards) {

            for (let fCID in outputStandardFiles[standard]) {

                const flatbufferBinary: Buffer = outputStandardFiles[standard][fCID];

                const CID = await ipfsHash.of(flatbufferBinary);

                const jsonResponseError = await request(app)
                    .post(`/spacedata/${standard}`)
                    .set("Content-Type", "application/octet-stream")
                    .set("authorization", `{}`)
                    .send(flatbufferBinary);

                expect(jsonResponseError.status).toBe(401);

                expect(jsonResponseError.body.error).toMatch(`Signature invalid or key missing.`);

                const authMessage: AuthHeader = {
                    CID,
                    signature: await ethWallet.signMessage(CID),
                    nonce: performance.now(),
                };
                const authHeader = Buffer.from(JSON.stringify(authMessage)).toString("base64");
                const fbResponse = await request(app)
                    .post(`/spacedata/${standard}`)
                    .set("Content-Type", "application/octet-stream")
                    .set("authorization", authHeader)
                    .send(flatbufferBinary);
                expect(fbResponse.status).toBe(200);

                const postedFile = await request(app).get(
                    `/spacedata/${ethWallet.address.toLowerCase()}/${standard.toUpperCase()}`)
                    .set("accept", "application/octet-stream");

                let jTest = (buff: ArrayBuffer) => JSON.stringify(readFB(buff, standard, standards[standard]));
                expect(jTest(postedFile.body)).toEqual(jTest(flatbufferBinary));

                const postedFileJSON = (await request(app).get(
                    `/spacedata/${ethWallet.address.toLowerCase()}/${standard.toUpperCase()}`)
                    .set("accept", "application/json")).body;

                expect(JSON.stringify(postedFileJSON)).toEqual(jTest(flatbufferBinary));
            }
        }
    });

    it("Deletes a CID", async () => {
        const provider = ethWallet.address.toLowerCase();
        for (let standard in standards) {
            for (let fCID in outputStandardFiles[standard]) {

                const flatbufferBinary: Buffer = outputStandardFiles[standard][fCID];
                const CID = await ipfsHash.of(flatbufferBinary);

                const authMessage: AuthHeader = {
                    CID,
                    signature: await ethWallet.signMessage(CID),
                    nonce: performance.now(),
                };

                const authHeader = Buffer.from(JSON.stringify(authMessage)).toString("base64");
                const fbResponse = await request(app)
                    .delete(`/spacedata/${standard}`)
                    .set("authorization", authHeader)
                    .send();

                expect(fbResponse?.body?.CID).toBe(CID);
                expect(fbResponse.status).toBe(200);

                const requestPath = `/spacedata/${provider}/${standard.toUpperCase()}/${CID}`;
                const shouldBeGone = (await request(app).get(requestPath));

                expect(shouldBeGone.status).toBe(404);
            }
        }
    }, 50000)
});

describe("POST /echo", () => {
    it("Echoes input", async () => {
        for (let standard in standards) {
            for (let fCID in outputStandardFiles[standard]) {

                const flatbufferBinary: Buffer = outputStandardFiles[standard][fCID];
                const fbResponse = await request(app)
                    .post(`/echo/${standard}`)
                    .set("Content-Type", "application/octet-stream")
                    .send(flatbufferBinary);
                expect(fbResponse.status).toBe(200);
            }
        }
    })
});
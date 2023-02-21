import request from "supertest";
import { generateData } from "../utility/generate.test.data";
const dataPath: string = `test/output/data/`;
import { app } from "@/lib/worker/app";
import * as standards from "@/lib/standards/standards";
import { dirname, extname, join } from "node:path";
import { exists, existsSync, readFileSync, rmdirSync, rmSync } from "node:fs";
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

//@ts-ignore
var databaseConfig = config.database.config[config.database.config.primary];
const sqlfilename = join(dirname(databaseConfig.connection.filename), "standards.sql");

const outputStandardFiles: any = {};
let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON as any);

beforeAll(async () => {
    if (existsSync(databaseConfig.connection.filename)) {
        rmSync(databaseConfig.connection.filename);
    }
    try {
        if (existsSync(config.data.fileSystemPath)) {
            rmdirSync(config.data.fileSystemPath, { recursive: true });
        }
    } catch (e) {
        //console.info(`Could not delete ${config.data.fileSystemPath}: `, e);
    }
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
/**/
describe("POST /endpoint Write To Database", () => {
    rmSync(config.data.ingest, { recursive: true, force: true });

    it("should accept JSON and Flatbuffer files and save them to the database", async () => {
        for (let standard in standards) {
            if (standard !== "OMM") continue;
            const flatbufferBinary: Buffer = readFileSync(join(dataPath, outputStandardFiles[standard].fbs));

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

            let postedCID;
            let timerCount = 0;
            while (!postedCID && timerCount < 10) {
                console.clear();
                console.log(`${Date.now()} - Trying CID Service...`);
                postedCID = (await request(app)
                    .get(`/cid/${ethWallet.address}/${standard}`)).body[0];
                if (!postedCID) {
                    await new Promise(r => setTimeout(r, 2000));
                }
                timerCount++;
            }
            if (!postedCID) {
                throw Error("Too Many Attempts");
            }
            expect(standard).toEqual(postedCID.STANDARD);
            expect(ethWallet.address.toLowerCase()).toEqual(postedCID.PROVIDER);
            expect(CID).toEqual(postedCID.CID);

        }
        await new Promise(r => setTimeout(r, 5000)); //!IMPORTANT
    }, 30000);
});


describe("GET /endpoint Read From Database", () => {
    rmSync(config.data.ingest, { recursive: true, force: true });
    const provider = ethWallet.address.toLowerCase();
    it("should accept JSON and Flatbuffer files and save them to the database", async () => {
        for (let standard in standards) {
            if (standard !== "OMM") continue;

            const flatbufferBinary: Buffer = readFileSync(join(dataPath, outputStandardFiles[standard].fbs));
            const CID = await ipfsHash.of(flatbufferBinary);
            const requestPath = `/spacedata/${provider}/${standard.toUpperCase()}/${CID}`;
            let file = (await request(app).get(requestPath));
            console.log(requestPath, file.error, file.body, file.headers["x-digital-signature"]);
        }


    }, 30000);
});

describe("POST /echo", () => {
    it("Echoes input", async () => {
        for (let standard in standards) {
            if (standard !== "OMM") continue;
            const flatbufferBinary: Buffer = readFileSync(join(dataPath, outputStandardFiles[standard].fbs));
            const fbResponse = await request(app)
                .post(`/echo/${standard}`)
                .set("Content-Type", "application/octet-stream")
                .send(flatbufferBinary);
            expect(fbResponse.status).toBe(200);
        }
    })
});
afterAll(async () => {
    await deinit();
    //rmSync(config.data.ingest, { recursive: true, force: true });
});
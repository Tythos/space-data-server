import request from "supertest";
import { generateData } from "../utility/generate.test.data";
const dataPath: string = `test/output/data/`;
import { app } from "@/lib/worker/app";
import * as standards from "@/lib/standards/standards";
import { extname, join } from "node:path";
import { readFileSync } from "node:fs";
import { ethWallet, btcWallet, btcAddress } from "@/test/utility/generate.crypto.wallets";
import * as jose from "jose";
import keyconvert from "@/packages/keyconvert";

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
            let keyConvert = new keyconvert({ kty: "EC", name: "ECDSA", namedCurve: "K-256", hash: "SHA-256" } as any);
            await keyConvert.import(ethWallet.privateKey.slice(2,), "hex");
            console.log(await keyConvert.publicKeyHex(), ethWallet.publicKey);
            const jsonFile = JSON.parse(readFileSync(join(dataPath, outputStandardFiles[standard].json), "utf8"));
            const jsonResponse = await request(app)
                .post(`/spacedata/${standard}`)
                .send(jsonFile);
            expect(jsonResponse.status).toBe(200);
        }
        /* const jsonResponse = await request(app)
            .post("/endpoint")
            .send({ foo: "bar" });
        

   
           const builder = new fb.Builder();
           const name = builder.createString("test");
           MySchema.startMySchema(builder);
           MySchema.addName(builder, name);
           const mySchema = MySchema.endMySchema(builder);
           builder.finish(mySchema);
           const flatbufferResponse = await request(server)
               .post("/endpoint")
               .send(builder.asUint8Array());
           expect(flatbufferResponse.status).toBe(200);*/
    });
});

afterAll(() => {



})
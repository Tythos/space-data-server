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
            let jwkETH = await ethKeyConvert.export("jwk", "private");
            const ecJosePrivateKey = await jose.importJWK({ ...jwkETH as any, crv: "secp256k1" }, "ES256");
            const ecJWKExport = await jose.exportJWK(ecJosePrivateKey);
            await ethKeyConvert.import(ecJWKExport, "jwk");
            expect(ethWallet.publicKey.slice(2,)).toEqual(await ethKeyConvert.export("hex", "public"));
            const jsonFileString = readFileSync(join(dataPath, outputStandardFiles[standard].json), "utf8");
            const jsonFile = JSON.parse(jsonFileString);
            expect(JSON.stringify(jsonFile)).toEqual(jsonFileString);
            const jwe = await new jose
                .GeneralSign(new TextEncoder().encode(jsonFileString))
                .addSignature(ecJosePrivateKey)
                .setUnprotectedHeader({ alg: "ES256K" });
            console.log(await jwe.sign());
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
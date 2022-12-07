import request from "supertest";
import { generateData } from "../utility/generate.test.data";
const dataPath: string = `test/output/data/`;
import { app } from "@/lib/worker/app";
import * as standards from "@/lib/standards/standards";
import { extname } from "node:path";
import { ethWallet, btcWallet, btcAddress } from "@/test/utility/generate.crypto.wallets";

beforeAll(() => {

})

describe("POST /endpoint", () => {

    it("should accept JSON and Flatbuffer files and save them to the database", async () => {
        const outputStandardFiles: any = {};
        const outputPaths = await generateData(10, dataPath);
        const outputFiles = outputPaths.forEach((p: any) => {
            let _file = p[0].split("/").pop();
            let standard = p[0].split("/").pop().substring(0, 3);
            outputStandardFiles[standard] = outputStandardFiles[standard] || {};
            outputStandardFiles[standard][extname(_file).replace(".", "")] = _file;
        });

        console.log(outputStandardFiles);
        //.filter((p: any) => { return extname(p[0]) === ".json" })
        for (let standard in standards) {

            const jsonResponse = await request(app)
                .post(`/spacedata/`)
                .send(outputStandardFiles[standard]);
        }
        const jsonResponse = await request(app)
            .post("/endpoint")
            .send({ foo: "bar" });
        /* expect(jsonResponse.status).toBe(200);

   
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
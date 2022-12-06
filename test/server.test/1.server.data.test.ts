import request from "supertest";
import { generateData } from "../utility/generate.test.data";
const dataPath: string = `test/output/data`;
import { app } from "@/lib/worker/app";
import { extname } from "node:path";
import { ethWallet, btcWallet, btcAddress } from "@/test/utility/generate.crypto.wallets";

beforeAll(() => {

})

describe("POST /endpoint", () => {

    it("should accept JSON and Flatbuffer files and save them to the database", async () => {

        const outputPaths = await generateData(10, dataPath);
        //console.log(outputPaths.filter((p: any) => { return extname(p[0]) === ".json" }).map((p: any) => p[0]))
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
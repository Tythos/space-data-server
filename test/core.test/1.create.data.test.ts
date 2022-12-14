import { describe, test, beforeAll } from "@jest/globals";
import { fTCheck, refRootName, resolver } from "@/lib/database/generateTables";
import { readdirSync, readFileSync, promises } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import * as standards from "@/lib/standards/standards";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion";
import { generateData } from "../utility/generate.test.data";
const dataPath: string = `test/output/data`;

let total = 10;

if (total > 10) {
    jest.setTimeout(total * 100);
}


describe('Test Data Entry', () => {

    test('Enter Data For Each Data Type', async () => {

        const outputPaths = await generateData(total, dataPath);
        //Expect all files to be present
        expect(outputPaths.map((oP: any) => { return oP[0].replace(dataPath + "/", "") }).sort()
        ).toEqual(readdirSync(`${dataPath}/`).filter(f => f !== ".gitignore").sort());

        //Expect deserialized flatbuffers to exactly equal the JSON representation, input flatbuffer to equal output
        for (let standard in standards) {
            let currentStandard = standardsJSON[standard];
            let tableName = refRootName(currentStandard.$ref);
            let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
            let parentClass: any = standards[pClassName];
            let jsonStringInput = readFileSync(`${dataPath}/${standard}.input.json`, 'utf8');
            let flatBufferInput: Buffer = readFileSync(`${dataPath}/${tableName}.input.fbs`);
            let flatBufferObject = readFB(flatBufferInput, tableName, parentClass);
            let flatBufferOutput: Buffer = writeFB(flatBufferObject);

            expect(JSON.stringify(flatBufferObject)).toStrictEqual(jsonStringInput);

            expect(flatBufferInput).toEqual(flatBufferOutput);
        }


    })
});
import { describe, expect, test, beforeAll } from "@jest/globals";
import { generateDatabase, refRootName } from "../lib/database/generateTables";
import knex from "knex";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import * as standards from "../lib/standards/standards";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { JSONSchema4 } from "json-schema";
import databaseConfig, { filename as databaseFilename } from "@/lib/database/config/default";
const sqlfilename = "./test/output/standards.sql";
import { readFB } from "@/lib/utility/flatbufferConversion";
import { read, write } from "@/lib/database/index";

let knexConnection: any;

let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON);

const dataPath: string = "test/output/data";

beforeAll(async () => {
    knexConnection = await knex(databaseConfig);
    await generateDatabase(standardsArray, databaseFilename, sqlfilename, knexConnection);
});

describe('Database Table Generation', () => {
    test('Generate Database With Correct Tables', async () => {
        for (let s = 0; s < standardsArray.length; s++) {
            let tableName = refRootName(standardsArray[s].$ref);
            let cI = await knexConnection(tableName).columnInfo();
            expect(Object.keys(cI).length).toBeGreaterThan(0);
        }
    });
});

describe('Test Data Entry', () => {
    test('Enter Data For Each Data Type', async () => {
        let standard: keyof typeof standards;
        for (standard in standards) {
            if (standard === "OPM") continue;
            let currentStandard = standardsJSON[standard];
            let tableName = refRootName(currentStandard.$ref);
            let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
            let parentClass: any = standards[pClassName];
            let flatbufferInput = readFB(readFileSync(`${dataPath}/${tableName}.input.fbs`), tableName, parentClass);
            await write(tableName, flatbufferInput.RECORDS, currentStandard);
            let readData = await read(standard, currentStandard);
            readData.RECORDS = flatbufferInput.RECORDS;
            expect(JSON.stringify(flatbufferInput, null, 4)).toEqual(JSON.stringify(readData, null, 4));
        }
    })
});
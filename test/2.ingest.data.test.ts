import { describe, expect, test, beforeAll } from "@jest/globals";
import { fTCheck, generateDatabase, refRootName, resolver } from "../lib/database/generateTables";
import knex from "knex";
import { readFileSync, writeFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import * as standards from "../lib/standards/standards";
import { faker } from '@faker-js/faker';
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { JSONSchema4 } from "json-schema";
import databaseConfig, { filename as databaseFilename } from "@/lib/database/config/default";
const sqlfilename = "./test/output/standards.sql";
import write from "@/lib/database/write";
import read from "@/lib/database/read";
import { execSync } from "child_process";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion";
const dataPath: string = "test/output/data"


let knexConnection: any;

let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON);

beforeAll(async () => {
    knexConnection = await knex(databaseConfig);
    await generateDatabase(standardsArray, databaseFilename, sqlfilename, knexConnection);
});

describe('Test Generation', () => {
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
            let currentStandard = standardsJSON[standard];
            let tableName = refRootName(currentStandard.$ref);
            let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
            let parentClass: any = standards[pClassName];

            let flatbufferInput = await readFB(readFileSync(`${dataPath}/${tableName}.input.fbs`), tableName, parentClass);
            await write(tableName, flatbufferInput.RECORDS, currentStandard);
            const output = await read(standard, currentStandard, [["select", "*"]]);
            let sortProp = Object.keys(flatbufferInput.RECORDS[0])[0];
            const sortFunc = (a: any, b: any) => (a[sortProp] > b[sortProp]) ? 1 : -1;
            writeFileSync(`.tmp/${tableName}.export.txt`, `${tableName}:INPUT \n\n ${JSON.stringify(flatbufferInput.RECORDS.sort(sortFunc), null, 4)}${tableName}:OUTPUT \n\n ${JSON.stringify(output.RECORDS.sort(sortFunc), null, 4)} `)
            expect(JSON.stringify(flatbufferInput.RECORDS.sort(sortFunc), null, 4)).toEqual(JSON.stringify(output.RECORDS.sort(sortFunc), null, 4));
        }

    })
});
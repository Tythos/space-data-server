import { describe, expect, test, beforeAll } from "@jest/globals";
import { generateDatabase } from "../lib/database/generateTables";
import knex from "knex";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import * as standards from "../lib/standards/standards";
import { faker } from '@faker-js/faker';
import { JSONSchema4 } from "json-schema";
import databaseConfig, { filename as databaseFilename } from "@/lib/database/config/default";
const sqlfilename = "./test/output/standards.sql";
import read from "@/lib/database/read";

const fDT: any = faker.datatype;

let knexConnection: any;

let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON);

beforeAll(async () => {
    knexConnection = await knex(databaseConfig);
    await generateDatabase(standardsArray, databaseFilename, sqlfilename, knexConnection);
});

describe('Retrieve Data From Database', () => {

    test('Retrieve Data For Each Data Type', async () => {
        let standard: keyof typeof standards;

        for (standard in standards) {
            let currentStandard = standardsJSON[standard];
            const output = await read(standard, currentStandard, [["select", "*"]]);
            expect(1).toEqual(1);
        }

    })
});
import { describe, expect, test, beforeAll } from "@jest/globals";
import { generateDatabase, refRootName } from "../lib/database/generateTables"
import knex from "knex";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import * as standards from "../lib/standards/standards";

const filename = "./test/output/standards.sqlite";
const sqlfilename = "./test/output/standards.sql";

beforeAll(async () => {
    await generateDatabase(standardsJSON, filename, sqlfilename);
});

describe('Test Generation', () => {
    test('Generate Database With Correct Tables', async () => {
        var knexConnection = knex({
            client: 'better-sqlite3',
            connection: { filename },
            useNullAsDefault: true
        });

        for (let s = 0; s < standardsJSON.length; s++) {
            let tableName = refRootName(standardsJSON[s].$ref);
            let cI = await knexConnection(tableName).columnInfo();
            expect(Object.keys(cI).length).toBeGreaterThan(0);
        }
    });
});

describe('Test Data Entry', () => {
    test('Enter Data For Each Data Type', async () => {
        console.log(standards)
        expect(1).toEqual(1);
    })
});
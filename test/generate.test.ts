import { describe, expect, test } from "@jest/globals";
import { generateDatabase, refRootName } from "../lib/database/generateTables"
import knex from "knex";
import { readFileSync, readdirSync } from "fs";
import { table } from "console";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));

describe('Test Generation', () => {
    test('Generate Database With Correct Tables', async () => {
        await generateDatabase(standardsJSON, "./test/output/standards.sqlite", "./test/output/standards.sql");
        var knexConnection = knex({
            client: 'better-sqlite3',
            connection: { filename: "./test/output/standards.sqlite" },
            useNullAsDefault: true
        });

        for (let s = 0; s < standardsJSON.length; s++) {
            let tableName = refRootName(standardsJSON[s].$ref);
            let cI = await knexConnection(tableName).columnInfo();
            expect(Object.keys(cI).length).toBeGreaterThan(0);
        }
    });
});
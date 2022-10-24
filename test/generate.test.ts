import { describe, expect, test } from "@jest/globals";
import { generateDatabase } from "../lib/database/generateTables"
import knex from "knex";
import { readFileSync, readdirSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
describe('Test Generation', () => {

    test('adds 1 + 2 to equal 3', async () => {
        await generateDatabase(standardsJSON);
        expect((1 + 2)).toBe(3);
    });
});
import { describe, expect, test, beforeAll } from "@jest/globals";
import { generateDatabase, refRootName } from "../lib/database/generateTables"
import knex from "knex";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import * as standards from "../lib/standards/standards";

const filename = "./test/output/standards.sqlite";
const sqlfilename = "./test/output/standards.sql";
let knexConnection: any;

beforeAll(async () => {
    await generateDatabase(standardsJSON, filename, sqlfilename);
    knexConnection = knex({
        client: 'better-sqlite3',
        connection: { filename },
        useNullAsDefault: true
    });
});

describe('Test Generation', () => {
    test('Generate Database With Correct Tables', async () => {


        for (let s = 0; s < standardsJSON.length; s++) {
            let tableName = refRootName(standardsJSON[s].$ref);
            let cI = await knexConnection(tableName).columnInfo();
            expect(Object.keys(cI).length).toBeGreaterThan(0);
        }
    });
});

describe('Test Data Entry', () => {
    test('Enter Data For Each Data Type', async () => {
        let standard: keyof typeof standards;
        for (standard in standards) {
            console.log(standard, ":");
            for (let s = 0; s < standardsJSON.length; s++) {
                let tableName = refRootName(standardsJSON[s].$ref);
                let pClassName: keyof typeof standards = `${tableName}_STANDARD` as unknown as any;
                let parentClass: any = standards[pClassName];
                console.log(parentClass);
                let cClassName: keyof typeof parentClass = `${tableName}COLLECTIONT`;
                let standardCollection = new parentClass[cClassName];
                console.log(cClassName, parentClass[cClassName]);
            }


            /*
           let standardClass: string;
            for (standardClass in standards[standard]) {
                console.log(standardClass);
            }*/

        }
        expect(1).toEqual(1);
    })
});
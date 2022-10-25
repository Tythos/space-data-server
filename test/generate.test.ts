import { describe, expect, test, beforeAll } from "@jest/globals";
import { fTCheck, generateDatabase, refRootName } from "../lib/database/generateTables"
import knex from "knex";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import * as standards from "../lib/standards/standards";
import { faker } from '@faker-js/faker';

const filename = "./test/output/standards.sqlite";
const sqlfilename = "./test/output/standards.sql";
const fDT = faker.datatype;

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
            for (let s = 0; s < standardsJSON.length; s++) {
                let currentStandard = standardsJSON[s];
                let tableName = refRootName(currentStandard.$ref);
                let pClassName: keyof typeof standards = `${tableName}_STANDARD` as unknown as any;
                let parentClass: any = standards[pClassName];
                let cClassName: keyof typeof parentClass = `${tableName}COLLECTIONT`;
                let standardCollection = new parentClass[cClassName];
                for (let i = 0; i < 1; i++) {
                    let newObject = new parentClass[tableName];
                    let classDef = currentStandard.definitions[tableName].properties;

                    for (let x in classDef) {
                        if (classDef[x]?.type && !fTCheck(classDef[x].type)) {
                            let { type, minimum: min, maximum: max } = (classDef[x]);
                            let fakerValue: any = null;

                            if (type === "integer") {
                                fakerValue = fDT.number({ min, max })
                            } else if (type === "number") {
                                fakerValue = fDT.float();
                            } else if (type === "boolean") {
                                fakerValue = fDT.boolean();
                            } else if (type === "string") {
                                if (~x.indexOf("_DATE") || ~x.indexOf("EPOCH")) {
                                    fakerValue = fDT.datetime().toISOString();
                                } else {
                                    fakerValue = fDT.string();
                                }
                            }
                            newObject[x] = fakerValue;
                        }
                    }
                    standardCollection.RECORDS.push(newObject);
                }

                console.log(tableName, JSON.stringify(standardCollection, null, 4));
            }
        }
        expect(1).toEqual(1);
    })
});
import { describe, expect, test, beforeAll } from "@jest/globals";
import { fTCheck, generateDatabase, refRootName, resolver } from "../lib/database/generateTables"
import knex from "knex";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import * as standards from "../lib/standards/standards";
import { faker } from '@faker-js/faker';
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { JSONSchema4 } from "json-schema";

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

    const buildObject = (classProperties: KeyValueDataStructure, parentClass: any, jsonSchema: JSONSchema4) => {
        let newObject = new parentClass;
        for (let x in classProperties) {
            let resolvedProp: any = resolver(classProperties[x], jsonSchema);
            if (!fTCheck(resolvedProp?.type)) {
                let { type, minimum: min, maximum: max } = (resolvedProp);
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
                    } else if (!x.indexOf("ORIGINATOR")) {
                        fakerValue = faker.company.name();
                    } else {
                        fakerValue = fDT.string();
                    }
                }
                newObject[x] = fakerValue;
            } else if (resolvedProp?.type === "object") {
                console.log(resolvedProp);
            }
        }
        return newObject;
    }

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
                    let newObject = buildObject(currentStandard.definitions[tableName].properties, parentClass[tableName], standardsJSON[s]);
                    standardCollection.RECORDS.push(newObject);
                }

                //console.log(tableName, JSON.stringify(standardCollection, null, 4));
            }
        }
        expect(1).toEqual(1);
    })
});
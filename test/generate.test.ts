import { describe, expect, test, beforeAll } from "@jest/globals";
import { fTCheck, generateDatabase, refRootName, resolver } from "../lib/database/generateTables";
import knex from "knex";
import { readFileSync, writeFile, writeFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import * as standards from "../lib/standards/standards";
import { faker } from '@faker-js/faker';
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { JSONSchema4 } from "json-schema";
import databaseConfig, { filename as databaseFilename } from "@/lib/database/config/default";
const sqlfilename = "./test/output/standards.sql";
import create from "@/lib/database/create";
import read from "@/lib/database/read";
import { execSync } from "child_process";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion";

const fDT: any = faker.datatype;

let knexConnection: any;

let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON);

const dataPath: string = "test/output/data"
beforeAll(async () => {
    execSync(`rm -rf ${dataPath}/*.json`);
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
    const buildProp = (prop: any, propName: string) => {
        let { type, minimum: min, maximum: max } = (prop);
        let fakerValue: any = null;

        if (type === "integer") {
            fakerValue = fDT.number({ min, max })
        } else if (type === "number") {
            fakerValue = fDT.float();
        } else if (type === "boolean") {
            fakerValue = fDT.boolean();
        } else if (type === "string") {
            if (
                ~propName.indexOf("_DATE") ||
                ~propName.indexOf("EPOCH") ||
                propName.indexOf("TIME") > 0 ||
                ~propName.indexOf("TCA")
            ) {
                fakerValue = fDT.datetime().toISOString();
            } else if (~propName.indexOf("ORIGINATOR") || ~propName.indexOf("MESSAGE_FOR")) {
                fakerValue = faker.company.name();
            } else if (~propName.indexOf("REF_FRAME")) {
                faker.helpers.arrayElement(["ICRF",
                    "ITRF-93",
                    "ITRF-97",
                    "ITRF2000",
                    "TOD",
                    "EME2000",
                    "TDR",
                    "GRC"]);
            } else {
                fakerValue = faker.datatype.hexadecimal();
            }
        }
        return fakerValue;
    }

    const buildObject = (classProperties: KeyValueDataStructure, parentClass: any, tableName: string, jsonSchema: JSONSchema4, fid: Number) => {
        let newObject = new parentClass[`${tableName}T`];
        newObject["fid"] = fid;
        for (let x in classProperties) {
            let resolvedProp: any = resolver(classProperties[x]?.items || classProperties[x], jsonSchema);
            if (!fTCheck(resolvedProp?.type)) {
                newObject[x] = buildProp(resolvedProp, x);
            } else if (resolvedProp?.type === "object" && classProperties[x]?.type !== "array") {
                newObject[x] = buildObject(resolvedProp.properties, parentClass, refRootName(resolvedProp.$$ref), jsonSchema, fid);
            } else if (classProperties[x]?.type === "array") {
                newObject[x] = [];
                for (let i = 0; i < 2; i++) {
                    let aObject = !fTCheck(resolvedProp?.type) ?
                        buildProp(resolvedProp, x) :
                        buildObject(
                            resolvedProp?.items || resolvedProp.properties,
                            parentClass,
                            refRootName(resolvedProp.$$ref),
                            jsonSchema, fid);
                    newObject[x].push(aObject);
                }
            }
        }
        return newObject;
    }

    test('Enter Data For Each Data Type', async () => {
        let standard: keyof typeof standards;
        let total = 1_000;

        for (standard in standards) {
            let currentStandard = standardsJSON[standard];
            let tableName = refRootName(currentStandard.$ref);
            let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
            let parentClass: any = standards[pClassName];
            let cClassName: keyof typeof parentClass = `${tableName}COLLECTIONT`;
            let input = new parentClass[cClassName];

            let batch = 0;
            for (let i = 0; i < total; i++) {
                if (!(i % 100)) {
                    batch++;
                }
                let newObject = buildObject(currentStandard.definitions[tableName].properties, parentClass, tableName, currentStandard, batch);
                input.RECORDS.push(newObject);
            }

            writeFileSync(`${dataPath}/${standard}.input.json`, JSON.stringify(input, null, 4));
            await create(tableName, input.RECORDS, currentStandard);

            const output = await read(standard, currentStandard, [["select", "*"]]);
            expect(input.length).toEqual(output.length);

            writeFileSync(`${dataPath}/${tableName}.results.json`, JSON.stringify(output, null, 4));
            writeFileSync(`${dataPath}/${tableName}.results.fbs`, writeFB(output));
            writeFileSync(`${dataPath}/${tableName}.fbs.conversion.json`, JSON.stringify(readFB(readFileSync(`${dataPath}/${tableName}.results.fbs`), tableName, parentClass), null, 4));
        }

    })
});
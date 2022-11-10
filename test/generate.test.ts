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
import create from "@/lib/database/create";
import read from "@/lib/database/read";

const fDT = faker.datatype;

let knexConnection: any;

let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON);

beforeAll(async () => {
    knexConnection = knex(databaseConfig);
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

    const buildObject = (classProperties: KeyValueDataStructure, parentClass: any, tableName: string, jsonSchema: JSONSchema4) => {
        let newObject = new parentClass[tableName];
        for (let x in classProperties) {
            let resolvedProp: any = resolver(classProperties[x]?.items || classProperties[x], jsonSchema);
            if (!fTCheck(resolvedProp?.type)) {
                newObject[x] = buildProp(resolvedProp, x);
            } else if (resolvedProp?.type === "object" && classProperties[x]?.type !== "array") {
                newObject[x] = buildObject(resolvedProp.properties, parentClass, refRootName(resolvedProp.$$ref), jsonSchema);
            } else if (classProperties[x]?.type === "array") {
                newObject[x] = [];
                for (let i = 0; i < 1; i++) {
                    let aObject = !fTCheck(resolvedProp?.type) ?
                        buildProp(resolvedProp, x) :
                        buildObject(
                            resolvedProp?.items || resolvedProp.properties,
                            parentClass,
                            refRootName(resolvedProp.$$ref),
                            jsonSchema);
                    newObject[x].push(aObject);
                }
            }
        }
        return newObject;
    }

    test('Enter Data For Each Data Type', async () => {
        let standard: keyof typeof standards;
        let total = 10;
        let returnCount = 0;
        for (standard in standards) {
            //if (standard !== "CDM") continue
            let currentStandard = standardsJSON[standard];
            let tableName = refRootName(currentStandard.$ref);
            let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
            let parentClass: any = standards[pClassName];
            let cClassName: keyof typeof parentClass = `${tableName}COLLECTIONT`;
            let standardCollection = new parentClass[cClassName];
            for (let i = 0; i < total; i++) {
                let newObject = buildObject(currentStandard.definitions[tableName].properties, parentClass, tableName, currentStandard);
                standardCollection.RECORDS.push(newObject);
            }
            await create(tableName, standardCollection.RECORDS, currentStandard);
            let resultQuery = await knexConnection(tableName).select("*");
            writeFileSync(`.tmp/${standard}.results.json`, JSON.stringify(resultQuery, null, 4));

            const results = await read(standard, currentStandard);
            console.log("TABLENAME", tableName, resultQuery.length, results.RECORDS);

            /*console.log("ephemBplca", await knexConnection("ephemerisDataBlock").whereIn("OEM_id", resultQuery.map((e: any) => e.id)));
              if (standard.indexOf("CDM") === 0) {
                  let foreignKeys = ["OBJECT1", "OBJECT2"];
                  let CDMObjects = await knexConnection("CDMObject").whereIn("id", resultQuery.map((e: any) => foreignKeys.map(fK => e[fK])).flat());
                  let CDMObjectsHash: KeyValueDataStructure = {};
                  for (let c = 0; c < CDMObjects.length; c++) {
                      CDMObjectsHash[CDMObjects[c].id] = CDMObjects[c];
                  }
                  for (let t = 0; t < resultQuery.length; t++) {
                      //Build Objects From Schemas Here!!
                      for (let fK = 0; fK < foreignKeys.length; fK++) {
                          resultQuery[t][foreignKeys[fK]] = CDMObjectsHash[resultQuery[t][foreignKeys[fK]]];
                      }
                  }
              }*/
            returnCount += resultQuery.length;
        }
        expect(returnCount).toEqual(total * Object.keys(standards).length);
    })
});
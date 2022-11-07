import { describe, expect, test, beforeAll } from "@jest/globals";
import { fTCheck, generateDatabase, refRootName, resolver } from "../lib/database/generateTables";
import knex from "knex";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import * as standards from "../lib/standards/standards";
import { faker } from '@faker-js/faker';
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { JSONSchema4 } from "json-schema";
import e from "express";

const filename = "./test/output/standards.sqlite";
const sqlfilename = "./test/output/standards.sql";
const fDT = faker.datatype;

let knexConnection: any;

let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON);

beforeAll(async () => {
    knexConnection = knex({
        client: 'better-sqlite3',
        connection: { filename },
        useNullAsDefault: true
    });
    await generateDatabase(standardsArray, filename, sqlfilename, knexConnection);
    await knexConnection("CAT").select("*");
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

    const buildQuery = async (tableName: string, queryArray: Array<any>, standardsSchema: JSONSchema4, resultObject: KeyValueDataStructure = {}, runQuery: boolean = true): Promise<any> => {

        if (!tableName) {
            throw Error(`Missing Table Name for Data Like: ${JSON.stringify(queryArray[0], null, 4)}`);
        }

        resultObject[tableName] = resultObject[tableName] || [];
        const foreignProperties: KeyValueDataStructure = {};
        //determine foreignKey requirements for this level in object
        let tableDefinition = standardsSchema.definitions ? standardsSchema.definitions[tableName] : null;
        if (!tableDefinition) {
            throw Error(`Attempted to Run Query on non-existent table definition: ${tableName}`);
        }

        for (let prop in tableDefinition.properties) {
            const { type: pType } = tableDefinition.properties[prop];
            const { type, $$ref } = resolver(tableDefinition.properties[prop], standardsSchema);
            if (fTCheck(type as string)) {
                foreignProperties[refRootName($$ref)] = foreignProperties[refRootName($$ref)] || { fields: {}, fStartID: null, type, pType };
                foreignProperties[refRootName($$ref)].fields[prop] = {};
            }
        }

        for (let fTable in foreignProperties) {
            foreignProperties[fTable].fStartID = await knexConnection(fTable).max('id as fStartID').first().fStartID || 0;
        }

        const queryLoop = async (queryBatchInput: Array<any>, page?: Number) => {
            const { startID } = await knexConnection(tableName).max('id as startID').first();
            for (let i = 0; i < queryBatchInput.length; i++) {
                delete queryBatchInput[i].bb;
                delete queryBatchInput[i].bb_pos;
                queryBatchInput[i].id = (startID > -1 ? startID : 0) + i;
                for (let fTable in foreignProperties) {
                    let { fields, pType } = foreignProperties[fTable];
                    if (pType === "array") {
                        for (let fieldName in fields) {
                            let fTableRows = [...queryBatchInput[i][fieldName]];
                            for (let eRow = 0; eRow < fTableRows.length; eRow++) {
                                fTableRows[eRow][`${tableName}_id`] = queryBatchInput[i].id;
                            }
                            console.log("ROWS", fTable, fTableRows);
                            resultObject = await buildQuery(fTable, fTableRows, standardsSchema, resultObject, false);
                        }
                    }
                }
                resultObject[tableName].push(queryBatchInput[i]);

                /*queryBatchInput[i].id = queryBatchInput[i].id > -1 ? queryBatchInput[i].id : (startID ? startID : 0) + i;
                    console.log(queryBatchInput)
                    resultObject[tableName].push(queryBatchInput[i]);
                    for (let fTable in foreignProperties) {
                        resultObject[fTable] = resultObject[fTable] || [];
                        let { fields, pType } = foreignProperties[fTable];
                        if (pType === "array") {
                            for (let fieldName in fields) {
                                if (Array.isArray(queryBatchInput[i][fieldName]) && queryBatchInput[i][fieldName].length) {
                                    let fTableRows = [...queryBatchInput[i][fieldName]];
                                    for (let eRow = 0; eRow < fTableRows.length; eRow++) {
                                        fTableRows[eRow][`${tableName}_id`] = queryBatchInput[i].id;
                                    }
                                    resultObject = await buildQuery(fTable, fTableRows, standardsSchema, resultObject, false);
                                    delete queryBatchInput[i][fieldName];
                                }
                            }
    
                        } else if (pType === "object") {
                            for (let fieldName in fields) {
                                queryBatchInput[i][fieldName].id = foreignProperties[fTable].fStartID++;
                                resultObject[fTable].push({ ...queryBatchInput[i][fieldName] });
                            }
                        }
                        //resultObject = await buildQuery(fTable, resultObject[fTable], standardsSchema, resultObject, false);
                    }*/
            }
            if (runQuery) {
                console.log(resultObject);
                try {
                    for (let nTable in resultObject) {
                        await knexConnection(nTable).insert(resultObject[nTable]);
                    }
                } catch (e) {
                    console.error(e);
                }

            }
        }
        if (runQuery) {
            //TODO Global PageSize
            let pageSize = 100;
            let total = queryArray.length;
            for (let page = 0; page < total; page += pageSize) {
                await queryLoop(queryArray.slice(page, page + pageSize), page);

            }
        } else {
            await queryLoop(queryArray);
        }

        return resultObject;
    }

    test('Enter Data For Each Data Type', async () => {
        let standard: keyof typeof standards;
        let total = 3;
        let returnCount = 0;
        for (standard in standards) {
            if (standard !== "OEM") continue
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
            await buildQuery(tableName, standardCollection.RECORDS, currentStandard);
            let resultQuery = await knexConnection(tableName).select("*");
            console.log(resultQuery);
            // console.log(await knexConnection("ephemerisDataBlock"));//.whereIn("OEM_id", resultQuery.map((e: any) => e.id)));
            /*if (standard.indexOf("CDM") === 0) {
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
            // returnCount += resultQuery.length;
        }
        expect(returnCount).toEqual(total);// * Object.keys(standards).length);
    })
});
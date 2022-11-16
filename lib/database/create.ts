import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { JSONSchema4 } from "json-schema";
import toposort from "toposort";
import getID from "@/lib/utility/getID";
import { fTCheck, refRootName, resolver } from "@/lib/database/generateTables";
import databaseConfig from "@/lib/database/config/config"
import knex from "knex";

const knexConnection: any = knex(databaseConfig);
let pageSize = 200;

const insertData = async (
    tableName: string,
    queryArray: Array<any>,
    standardsSchema: JSONSchema4,
    resultObject: KeyValueDataStructure = {},
    tableTopo: any = [],
    runQuery: boolean = true): Promise<any> => {

    let nTables: Array<string> | null = null;
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
            foreignProperties[refRootName($$ref)] = foreignProperties[refRootName($$ref)] || { fields: {}, type, pType };
            foreignProperties[refRootName($$ref)].fields[prop] = {};
        }
    }

    const queryLoop = async (queryBatchInput: Array<any>, page?: Number) => {

        for (let i = 0; i < queryBatchInput.length; i++) {
            delete queryBatchInput[i].bb;
            delete queryBatchInput[i].bb_pos;
            queryBatchInput[i].id = getID();
            for (let fTable in foreignProperties) {
                let { fields, pType } = foreignProperties[fTable];
                if (pType === "array") {
                    tableTopo.push([tableName, fTable]);
                    for (let fieldName in fields) {
                        let fTableRows = [...queryBatchInput[i][fieldName]];
                        for (let eRow = 0; eRow < fTableRows.length; eRow++) {
                            fTableRows[eRow][`${tableName}_id`] = queryBatchInput[i].id;
                            fTableRows[eRow].id = getID();
                        }
                        resultObject = await insertData(fTable, fTableRows, standardsSchema, resultObject, tableTopo, false);
                        delete queryBatchInput[i][fieldName];
                    }
                } else {
                    tableTopo.push([fTable, tableName]);
                    for (let fieldName in fields) {
                        let objectRecord = { ...queryBatchInput[i][fieldName] };
                        objectRecord.id = getID();
                        resultObject = await insertData(fTable, [objectRecord], standardsSchema, resultObject, tableTopo, false);
                        queryBatchInput[i][fieldName] = objectRecord.id;
                    }
                }
            }
            resultObject[tableName].push(queryBatchInput[i]);
        }
        if (runQuery) {
            try {
                await knexConnection.transaction(async (trx: any) => {
                    nTables = nTables === null ? toposort(tableTopo) : nTables;
                    nTables = nTables.length ? nTables : [tableName];
                    for (let nT = 0; nT < nTables.length; nT++) {
                        const nTable = nTables[nT];
                        const total = resultObject[nTable].length;
                        for (let page = 0; page < total; page += pageSize) {
                            await trx(nTable).insert(resultObject[nTable].slice(page, page + pageSize));
                        }
                        resultObject[nTable] = [];
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
    }
    if (runQuery) {
        //TODO Global PageSize

        let total = queryArray.length;
        for (let page = 0; page < total; page += pageSize) {
            await queryLoop(queryArray.slice(page, page + pageSize), page);
        }
    } else {
        await queryLoop(queryArray);
    }

    return resultObject;
}

export default insertData;
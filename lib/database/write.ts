import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { JSONSchema4 } from "json-schema";
import toposort from "toposort";
import getID from "@/lib/utility/getID";
import { fTCheck, refRootName, resolver } from "@/lib/database/generateTables";
import { runPragmas } from "./pragmas";
import { mkdirSync, readFileSync, rmSync, statSync, unlinkSync } from "fs";
import { writeFile } from "node:fs/promises"
import { join } from "path";
import { writeFB, getFileName } from '../utility/flatbufferConversion';
import { config } from "@/lib/config/config";
import { del } from "./delete";
import { checkLock, removeLock } from "@/lib/database/checkLock";

let knexConnection: any;
let pageSize = 200;

async function getCIDsToDelete(STANDARD) {
    const limit = config.data.limit?.[STANDARD] || config.data.defaultLimit;

    const count = await knexConnection('FILE_IMPORT_TABLE')
        .count('CID as count')
        .where('STANDARD', STANDARD)
        .first();

    const excess = count.count - limit;
    if (excess <= 0) {
        return []; // No need to delete any CIDs
    }

    const cids = await knexConnection('FILE_IMPORT_TABLE')
        .select('CID')
        .where('STANDARD', STANDARD)
        .orderBy('created_at')
        .limit(excess)
        .pluck('CID');

    await knexConnection('FILE_IMPORT_TABLE')
        .where('STANDARD', STANDARD)
        .whereIn('CID', cids)
        .delete();

    return cids;
}


const writeFiles = async (writePath: string, CID: string, input: any, DIGITAL_SIGNATURE: string, STANDARD: string) => {
    if (!input || !input.pack) {
        throw Error("NO INPUT")
    }
    STANDARD = STANDARD.toLowerCase();
    mkdirSync(writePath, { recursive: true });

    const fbsPath = join(
        writePath,
        getFileName(STANDARD, CID));

    const fbsPathSig = `${fbsPath}.sig`;
    await writeFile(fbsPath, writeFB(input));
    await writeFile(fbsPathSig, DIGITAL_SIGNATURE);
}

const insertData = async (
    tableName: string,
    queryArray: Array<any>,
    standardsSchema: JSONSchema4,
    resultObject: KeyValueDataStructure = {},
    tableTopo: any = [],
    runQuery: boolean = true, fileID: string = "no_id"): Promise<any> => {

    if (runQuery) {
        queryArray = structuredClone(queryArray);
        for (let i = 0; i < queryArray.length; i++) {
            queryArray[i].file_id = fileID;
        }
    }

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
                tableTopo.push([tableName, fTable]);
                if (pType === "array") {
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
                    for (let fieldName in fields) {
                        let objectRecord = { ...queryBatchInput[i][fieldName] };
                        objectRecord[`${tableName}_id`] = queryBatchInput[i].id;
                        objectRecord.id = getID();
                        resultObject = await insertData(fTable, [objectRecord], standardsSchema, resultObject, tableTopo, false);
                        queryBatchInput[i][fieldName] = objectRecord.id;
                    }
                }
            }
            resultObject[tableName].push(queryBatchInput[i]);
        }
        if (runQuery) {

            await knexConnection.transaction(async (trx: any) => {
                nTables = nTables === null ? toposort(tableTopo) : nTables;
                nTables = nTables.length ? nTables : [tableName];
                for (let nT = 0; nT < nTables.length; nT++) {
                    const nTable = nTables[nT];
                    const total = resultObject[nTable].length;
                    for (let page = 0; page < total; page += pageSize) {
                        await trx(nTable)
                            .insert(resultObject[nTable].slice(page, page + pageSize))
                            .onConflict()
                            .ignore()
                            .catch((e: any) => {

                            });
                    }
                    resultObject[nTable] = [];
                }
            }).catch((e: any) => {
                console.log(e)
            });

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

export const write = async (
    currentKnexConnection: any,
    tableName: string,
    inputObject: any,
    standardsSchema: JSONSchema4,
    CID: string = "no_id",
    DIGITAL_SIGNATURE: string,
    PROVIDER: string,
    STANDARD: string,
    created_at: Date,
) => {
    knexConnection = currentKnexConnection;
    await runPragmas(knexConnection);
    let currentCID = await knexConnection("FILE_IMPORT_TABLE").where({ CID }).first();
    let { RECORDS } = inputObject;

    PROVIDER = PROVIDER.toLowerCase();

    if (currentCID) return;

    await checkLock();

    if (config.data.useDatabase) {

        await insertData(
            tableName,
            RECORDS,
            standardsSchema,
            undefined,
            undefined,
            undefined,
            CID);

    }

    const writePath = join(
        process.cwd(),
        config.data.fileSystemPath,
        STANDARD.toUpperCase(),
        PROVIDER as string
    );

    let toDelete = await getCIDsToDelete(STANDARD);

    for (let d in toDelete) {
        await del(d);
    }

    await writeFiles(writePath, CID, inputObject, DIGITAL_SIGNATURE, STANDARD);

    await knexConnection("FILE_IMPORT_TABLE").insert([{
        CID,
        DIGITAL_SIGNATURE,
        PROVIDER,
        STANDARD,
        RECORD_COUNT: RECORDS.length,
        created_at: created_at.toISOString()
    }]).catch((e: any) => {
        console.log(e, CID, currentCID);
        removeLock();
    });
    removeLock();
}

export default write;
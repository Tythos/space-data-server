import { describe, expect, test, beforeAll } from "@jest/globals";
import { generateDatabase, refRootName } from "@/lib/database/generateTables";
import knex from "knex";
import { readFileSync } from "fs";
import standardsJSON from "@/lib/standards/schemas.json";
import * as standards from "@/lib/standards/standards";
import { JSONSchema4 } from "json-schema";
import write from "@/lib/database/write";
import read from "@/lib/database/read";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion";
import { execSync } from "node:child_process";
import { verifySig } from "@/lib/routes/spacedata/post";
const dataPath: string = "test/output/data";
const databasePath: string = "test/output/database";
import { config } from "@/lib/config/config";
import { dirname, join } from "path";

async function dumpDatabase(connection: any) {
    //const result = await connection.raw('PRAGMA foreign_keys');
    //console.log(result);  
    // prints the value of the foreign_keys pragma
    // Get a list of all tables in the database
    const tables = await connection("sqlite_master").where({ type: "table" }).select("name");

    // Flatten the list of tables
    const tableNames = tables.map((table: any) => table.name).filter((t: any) => t !== "FILE_IMPORT_TABLE");

    // Iterate over the list of tables and print their rows
    for (const tableName of tableNames) {
        const rows = await connection(tableName).select();
        if (rows.length) {
            console.log(`Table: ${tableName}, Rows Remain: ${rows.length}`);
        }
    }
}

//@ts-ignore
let databaseConfig = config.database.config[config.database.config.primary];
const sqlfilename = join(dirname(databaseConfig.connection.filename), "standards.sql");
let knexConnection: any;

let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON as any);

beforeAll(async () => {
    execSync(`rm -rf ${databasePath}/*.* && mkdir -p ${databasePath}`);
    knexConnection = await knex(databaseConfig);
    await generateDatabase(standardsArray, databaseConfig.connection.filename, sqlfilename, knexConnection, databaseConfig.version);
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
    test('Enter Data For Each Data Type', async () => {
        let standard: keyof typeof standards;

        for (standard in standards) {
            if (standard !== "CDM") continue;
            let currentStandard = standardsJSON[standard] as any;
            let tableName = refRootName(currentStandard.$ref);
            let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
            let parentClass: any = standards[pClassName];
            let flatBufferInput: Buffer = readFileSync(`${dataPath}/${tableName}.input.fbs`);
            let flatBufferObject = await readFB(flatBufferInput, tableName, parentClass);
            let DIGITAL_SIGNATURE = await readFileSync(`${dataPath}/${tableName}.input.fbs.ethsig`, "utf8");
            let CID = await readFileSync(`${dataPath}/${tableName}.input.fbs.ipfs.cid.txt`, "utf8");
            let ETH_ADDRESS: string = verifySig(CID, "", DIGITAL_SIGNATURE);
            await write(knexConnection, tableName, flatBufferObject.RECORDS, currentStandard, CID, DIGITAL_SIGNATURE, ETH_ADDRESS, standard.toUpperCase());
            const output = await read(knexConnection, standard, currentStandard, [["select", "*"], ["where", ["file_id", "=", CID]]], false);
            expect(JSON.stringify(flatBufferObject, null, 4)).toEqual(JSON.stringify(output, null, 4));
            await knexConnection.raw('PRAGMA foreign_keys = ON');
            await knexConnection(tableName).where('file_id', CID).del();
            const blank = await read(knexConnection, standard, currentStandard, [["select", "*"], ["where", ["file_id", "=", CID]]], false);

            //Sanity Check
            expect(flatBufferInput).toEqual(writeFB(flatBufferObject));
        }
        await dumpDatabase(knexConnection);
    })
});
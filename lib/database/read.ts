import { JSONSchema4 } from "json-schema";
import databaseConfig from "@/lib/database/config/config"
import knex from "knex";
import { fTCheck, refRootName, resolver } from "@/lib/database/generateTables";
import * as standards from "@/lib/standards/standards";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import { KeyValueDataStructure } from "../class/utility/KeyValueDataStructure";

const knexConnection: any = knex(databaseConfig);

const buildStatement = async (tableName: string, standardsSchema: JSONSchema4, query: KeyValueDataStructure, standardCollection: any, parentClass: any, tableQuery?: any) => {
    if (!tableQuery) {
        tableQuery = knexConnection(tableName);
        for (let x in query) {
            tableQuery[x](query[x]);
        }
    }
    const foreignProperties: KeyValueDataStructure = {};
    //determine foreignKey requirements for this level in object
    let tableDefinition = standardsSchema.definitions ? standardsSchema.definitions[tableName] : null;
    if (!tableDefinition) {
        throw Error(`Attempted to Run Query on non-existent table definition: ${tableName}`);
    }

    for (let prop in tableDefinition.properties) {
        const { type: pType } = tableDefinition.properties[prop];
        const { type, $$ref } = resolver(tableDefinition.properties[prop], standardsSchema);

        /*
        foreignProperties[refRootName($$ref)] = foreignProperties[refRootName($$ref)] || { fields: {}, type, pType };
        foreignProperties[refRootName($$ref)].fields[prop] = {};
        */
        if (pType === "array") {
            let records = await tableQuery;
            for (let r = 0; r < records.length; r++) {
                let n = new parentClass[tableName];
                for (let x in records[r]) {
                    if (n[x]) {
                        n[x] = records[r][x];
                    }
                }
                standardCollection.RECORDS.push(n);
            }
            tableQuery = console.log(refRootName($$ref), prop)
        }
    }

    return standardCollection;
}
const read = async (standard: string, standardsSchema: JSONSchema4, query: KeyValueDataStructure = { select: "*" }) => {

    let currentStandard = standardsJSON[standard];
    let tableName = refRootName(currentStandard.$ref);
    let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
    let parentClass: any = standards[pClassName];
    let cClassName: keyof typeof parentClass = `${tableName}COLLECTIONT`;
    let standardCollection = new parentClass[cClassName];

    const masterTableQuery: any = buildStatement(tableName, standardsSchema, query, standardCollection, parentClass);

    return await masterTableQuery;
}

export default read;
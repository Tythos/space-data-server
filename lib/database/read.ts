import { JSONSchema4 } from "json-schema";
import databaseConfig from "@/lib/database/config/config"
import knex from "knex";
import { fTCheck, refRootName, resolver } from "@/lib/database/generateTables";
import * as standards from "@/lib/standards/standards";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import { KeyValueDataStructure } from "../class/utility/KeyValueDataStructure";

const knexConnection: any = knex(databaseConfig);

const buildStatement = async (parentClass: any, tableName: string, standardsSchema: JSONSchema4, query: KeyValueDataStructure, parentArray: any, parentObject?: any, tableQuery?: any) => {
    if (!tableQuery) {
        tableQuery = knexConnection(tableName);
        for (let x in query) {
            if (Array.isArray(query[x])) {
                tableQuery[x].apply(tableQuery, query[x]);
            } else {
                tableQuery[x](query[x]);
            }
        }
    }
    console.log(tableQuery.toString());
    const records = await tableQuery;
    for (let r = 0; r < records.length; r++) {
        let n = new parentClass[tableName];
        for (let x in records[r]) {
            if (n[x]) {
                n[x] = records[r][x];
            }
        }
        parentArray.push(n);
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
            for (let p = 0; p < parentArray.length; p++) {
                let where: KeyValueDataStructure = {};
                where[`${tableName}_id`] = parentArray[p].id;
                parentArray[p][prop] = await buildStatement(parentClass, refRootName($$ref), standardsSchema, { where }/*TODO subquery*/, [])
            }
            //console.log("array", refRootName($$ref), prop);
        } else if (pType === "object") {
            //console.log("object", refRootName($$ref), prop);
        }
    }

    return parentArray;
}
const read = async (standard: string, standardsSchema: JSONSchema4, query: KeyValueDataStructure = { select: "*" }) => {

    let currentStandard = standardsJSON[standard];
    let tableName = refRootName(currentStandard.$ref);
    let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
    let parentClass: any = standards[pClassName];
    let cClassName: keyof typeof parentClass = `${tableName}COLLECTIONT`;
    let standardCollection = new parentClass[cClassName];

    await buildStatement(parentClass, tableName, standardsSchema, query, standardCollection.RECORDS);

    return standardCollection;
}

export default read;
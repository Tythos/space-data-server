import { JSONSchema4 } from "json-schema";
import databaseConfig from "@/lib/database/config/config"
import knex from "knex";
import { fTCheck, refRootName, resolver } from "@/lib/database/generateTables";
import * as standards from "@/lib/standards/standards";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import { KeyValueDataStructure } from "../class/utility/KeyValueDataStructure";

const knexConnection: any = knex(databaseConfig);
const toRemoveDefault: Array<string> = ["created_at", "updated_at"];
const buildStatement = async (parentClass: any, tableName: string, standardsSchema: JSONSchema4, query: any[][], parentArray: any, tableQuery?: any, toRemove: Array<string> = toRemoveDefault, debugProperties: boolean = false) => {
    if (!tableQuery) {
        tableQuery = knexConnection(tableName);
        if (Array.isArray(query)) {
            for (let x = 0; x < query.length; x++) {
                if (Array.isArray(query[x][1])) {
                    console.log(query[x][0])
                    tableQuery[query[x][0]].apply(tableQuery, query[x][1]);
                } else {
                    tableQuery[query[x][0]](query[x][1]);
                }
            }
        }
    }

    const records: any = await tableQuery;

    for (let r = 0; r < records.length; r++) {
        let n = new parentClass[`${tableName}T`]();
        for (let x in records[r]) {
            if (!~toRemove.indexOf(x) || debugProperties) {
                n[x] = records[r][x];
            }
        }
        parentArray.push(n);
    }

    //determine foreignKey requirements for this level in object
    let tableDefinition = standardsSchema.definitions ? standardsSchema.definitions[tableName] : null;
    if (!tableDefinition) {
        throw Error(`Attempted to Run Query on non-existent table definition: ${tableName}`);
    }

    for (let prop in tableDefinition.properties) {
        const { type } = tableDefinition.properties[prop];
        const { $$ref, type: rType } = resolver(tableDefinition.properties[prop], standardsSchema);

        const pType = type || rType;

        if (pType === "array") {
            for (let p = 0; p < parentArray.length; p++) {
                let where: Array<any> = [];
                const fID: string = `${tableName}_id`;
                parentArray[p][prop] =
                    await buildStatement(
                        parentClass,
                        refRootName($$ref),
                        standardsSchema,
                        [["select", "*"], ["where", [fID, parentArray[p].id]]]/*TODO subquery*/,
                        [],
                        null,
                        [fID, ...toRemoveDefault]);
            }
        } else if (pType === "object") {
            for (let p = 0; p < parentArray.length; p++) {
                parentArray[p][prop] = (
                    await buildStatement(
                        parentClass,
                        refRootName($$ref),
                        standardsSchema,
                        [["select", "*"], ["where", [`id`, parentArray[p][prop]]]]/*TODO subquery*/,
                        [], null, toRemoveDefault)
                )[0];

            }
        }
    }
    return parentArray;
}
const read = async (standard: string, standardsSchema: JSONSchema4, query: Array<any> = [["select", "*"]]) => {

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
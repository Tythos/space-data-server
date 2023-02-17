import { JSONSchema4 } from "json-schema";
import { refRootName, resolver } from "@/lib/database/generateTables";
import * as standards from "@/lib/standards/standards";
import { readFileSync } from "fs";
import { runPragmas } from "./pragmas";
import knex from "knex";
import _standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "../class/utility/KeyValueDataStructure";

const standardsJSON: KeyValueDataStructure = _standardsJSON;
let knexConnection: any;
const toRemoveDefault: Array<string> = ["created_at", "updated_at", "file_id"];
const buildStatement = async (parentClass: any, tableName: string, standardsSchema: JSONSchema4, query: any[][], parentArray: any, tableQuery?: any, toRemove: Array<string> = toRemoveDefault, debugProperties: boolean = false) => {
    if (!tableQuery) {
        tableQuery = knexConnection(tableName);
        if (Array.isArray(query)) {
            for (let x = 0; x < query.length; x++) {
                if (Array.isArray(query[x][1])) {
                    tableQuery[query[x][0]].apply(tableQuery, query[x][1]);
                } else {

                    tableQuery[query[x][0]](query[x][1]);
                }
            }
        }
    }
    //console.log(tableQuery.toString(), process.pid)
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
    let booleanProperties: Array<string> = [];
    for (let prop in tableDefinition.properties) {
        const { type } = tableDefinition.properties[prop];
        const { $$ref, type: rType } = resolver(tableDefinition.properties[prop], standardsSchema);

        const pType = type || rType;
        const fID: string = `${tableName}_id`;
        if (pType === "boolean") {
            booleanProperties.push(prop);
        }
        if (pType === "array") {
            for (let p = 0; p < parentArray.length; p++) {
                parentArray[p][prop] =
                    await buildStatement(
                        parentClass,
                        refRootName($$ref),
                        standardsSchema,
                        [["select", "*"], ["where", [fID, parentArray[p].id]], ["orderBy", ["id"]]]/*TODO subquery*/,
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
                        [], null,
                        [fID, ...toRemoveDefault])
                )[0];

            }
        }
    }

    return parentArray.map((pA: any) => {
        for (let x in pA) {
            if (~booleanProperties.indexOf(x)) {
                pA[x] = !!pA[x];
            }
        }
        if (!debugProperties) {
            delete pA.id;
        }
        return pA;
    });
}
const read = async (currentKnexConnection: any, standard: string, standardsSchema: JSONSchema4, query: Array<any> = [["select", "*"]], debugProperties: boolean = false) => {
    knexConnection = currentKnexConnection;
    await runPragmas(knexConnection);
    let currentStandard = standardsJSON[standard];
    let tableName = refRootName(currentStandard.$ref);
    let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
    let parentClass: any = standards[pClassName];
    let cClassName: keyof typeof parentClass = `${tableName}COLLECTIONT`;
    let standardCollection = new parentClass[cClassName];
    await buildStatement(parentClass, tableName, standardsSchema, query, standardCollection.RECORDS, undefined, undefined, debugProperties);
    return standardCollection;
}

export default read;
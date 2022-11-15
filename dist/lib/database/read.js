import databaseConfig from "../../lib/database/config/config";
import knex from "knex";
import { refRootName, resolver } from "../../lib/database/generateTables";
import * as standards from "../../lib/standards/standards";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
const knexConnection = knex(databaseConfig);
const toRemoveDefault = ["created_at", "updated_at"];
const buildStatement = async (parentClass, tableName, standardsSchema, query, parentArray, tableQuery, toRemove = toRemoveDefault, debugProperties = false) => {
    if (!tableQuery) {
        tableQuery = knexConnection(tableName);
        for (let x in query) {
            if (Array.isArray(query[x])) {
                tableQuery[x].apply(tableQuery, query[x]);
            }
            else {
                tableQuery[x](query[x]);
            }
        }
    }
    const records = await tableQuery;
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
                let where = {};
                const fID = `${tableName}_id`;
                where[fID] = parentArray[p].id;
                parentArray[p][prop] =
                    await buildStatement(parentClass, refRootName($$ref), standardsSchema, { select: "*", where } /*TODO subquery*/, [], null, [fID, ...toRemoveDefault]);
            }
        }
        else if (pType === "object") {
            for (let p = 0; p < parentArray.length; p++) {
                let where = {};
                where[`id`] = parentArray[p][prop];
                parentArray[p][prop] = (await buildStatement(parentClass, refRootName($$ref), standardsSchema, { select: "*", where, limit: 1 } /*TODO subquery*/, [], null, toRemoveDefault))[0];
            }
        }
    }
    return parentArray;
};
const read = async (standard, standardsSchema, query = { select: "*" }) => {
    let currentStandard = standardsJSON[standard];
    let tableName = refRootName(currentStandard.$ref);
    let pClassName = `${tableName}`;
    let parentClass = standards[pClassName];
    let cClassName = `${tableName}COLLECTIONT`;
    let standardCollection = new parentClass[cClassName];
    await buildStatement(parentClass, tableName, standardsSchema, query, standardCollection.RECORDS);
    return standardCollection;
};
export default read;

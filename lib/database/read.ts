import { JSONSchema4 } from "json-schema";
import databaseConfig from "@/lib/database/config/config"
import knex from "knex";
import { fTCheck, refRootName, resolver } from "@/lib/database/generateTables";

import { KeyValueDataStructure } from "../class/utility/KeyValueDataStructure";

const knexConnection: any = knex(databaseConfig);
const read = async (tableName: string, standardsSchema: JSONSchema4, query: KeyValueDataStructure = { select: "*" }) => {

    let tableDefinition = standardsSchema.definitions ? standardsSchema.definitions[tableName] : null;
    if (!tableDefinition) {
        throw Error(`Attempted to Run Query on non-existent table definition: ${tableName}`);
    }
    const masterTableQuery = knexConnection(tableName);
    for (let x in query) {
        masterTableQuery[x](query[x]);
    }


    return await masterTableQuery;
}

export default read;
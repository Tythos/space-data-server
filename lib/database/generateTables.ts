import { Knex } from "knex";
import { writeFileSync, rmSync, existsSync } from "fs";
import { JSONSchema4 } from "json-schema";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { config } from "../config/config";

let tSchema: Knex.SchemaBuilder;

let finalJSON: KeyValueDataStructure = {};
let foreignKeys: KeyValueDataStructure = {};
let arrayParentReference: KeyValueDataStructure = {};

const knexNumberTypes: KeyValueDataStructure = {
    255: "tinyint",
    65535: "smallint",
    16777215: "mediumint",
    4294967295: "integer",
    18446744073709551615: "bigint",
};

const foreignTypes: Array<any> = ["object", "array", "union"];

export const fTCheck = (ftPredicate: string | undefined) => ~foreignTypes.indexOf(ftPredicate);

export const refRootName = ($ref: string = ""): any => $ref.split("/").pop();

export const resolver = (prop: JSONSchema4, jsonSchema: JSONSchema4): JSONSchema4 => {
    prop = prop?.items || prop;
    let { $ref, $$ref } = prop;
    if ($ref) {
        let rpath = $ref.split("/").slice(1);
        let fprop = jsonSchema;
        for (let i = 0; i < rpath.length; i++) {
            try {
                fprop = fprop[rpath[i]];
            } catch (e) {
                console.log(fprop);
            }
        }
        fprop.$$ref = $ref || $$ref;
        return resolver(fprop, jsonSchema);
    } else {
        return prop;
    }
};

const builder = (predicateName: string, predicate: JSONSchema4, jsonSchema: JSONSchema4, rootPredicate: string, parentPredicate?: string): any => {
    let { type, $ref, $$ref, properties, items } = predicate;

    if ($ref) {
        return builder(
            predicateName,
            resolver(predicate, jsonSchema),
            jsonSchema,
            rootPredicate
        );
    } else if (type === "object") {
        if (predicateName !== rootPredicate) {
            predicateName = refRootName($$ref);
        }
        finalJSON[rootPredicate][predicateName] = {
            ...predicate,
            rootPredicate
        };
        for (let prop in properties) {
            let pprop = builder(prop, properties[prop], jsonSchema, rootPredicate, predicateName);
            /**
             * Check each property to see if it is one of the types used to create a foreign key relationship:
             * - object: Create a one to one relationship, child foreign key ID stored in parent table row
             * - array: Create a one to many relationship, parent ID stored in child foreign key rows
             * - union: same as object
             *
             */

            if (fTCheck(pprop.type)) {
                if (pprop.type === "object") {
                    foreignKeys[predicateName] = foreignKeys[predicateName] || {};
                    foreignKeys[predicateName][prop] = {
                        type: pprop.type,
                        tableName: refRootName(pprop.$$ref),
                    };
                } else {
                    let pTableName = refRootName(pprop.$$ref);
                    foreignKeys[pTableName] = foreignKeys[pTableName] || {};
                    foreignKeys[pTableName][predicateName] = {
                        type: pprop.type,
                        parentTable: predicateName
                    };
                }
            }
            finalJSON[rootPredicate][predicateName][prop] = pprop;
        }
        return { type, $ref, $$ref };
    } else if (type === "array") {
        let tableName = refRootName((predicate?.items as unknown as any)?.$ref);
        let parentTableName = parentPredicate;
        arrayParentReference[tableName] = parentTableName;
        return builder(predicateName, { ...items }, jsonSchema, rootPredicate);
    } else {
        return predicate;
    }
};

const buildTable = (rootTableName: string, tableSchema: any, namespace: string) => {
    tSchema.createTable(rootTableName, function (table: any) {
        if (rootTableName === namespace) {
            table.string("file_id");
            table.index("file_id");
        }
        table.integer("id").notNullable().unsigned().primary();
        table.index("id");
        table.timestamps(true, true);
        if (arrayParentReference[rootTableName]) {
            const fProperty = `${arrayParentReference[rootTableName]}_id`;
            table.integer(fProperty).unsigned();
            table.index(fProperty);
            table
                .foreign(fProperty)
                .references(`${arrayParentReference[rootTableName]}.id`)
                .deferrable("deferred")
                .onDelete("CASCADE");
        }
        for (let predicate in tableSchema) {
            if (predicate === "properties") continue;
            const _predicate = tableSchema[predicate];
            if (!_predicate) continue;
            const { type, minimum, maximum } = _predicate;
            if (~["integer", "number"].indexOf(type) || _predicate.enum) {
                let numType = "double";
                if (!isNaN(minimum) && !isNaN(maximum)) {
                    numType = knexNumberTypes[maximum - minimum];
                }
                let column = table[numType](predicate);
                if (minimum === 0) {
                    column.unsigned();
                }
            } else if (~["bool", "boolean"].indexOf(type)) {
                table.boolean(predicate);
            } else if (type === "string") {
                table.text(predicate);
            }
        }
        if (
            foreignKeys[rootTableName] &&
            Object.keys(foreignKeys[rootTableName])
        ) {
            for (let fProperty in foreignKeys[rootTableName]) {
                let { type, tableName } = foreignKeys[rootTableName][fProperty];
                if (type === "object" && !arrayParentReference[tableName]) {
                    table.integer(fProperty)
                        .unsigned()
                        .notNullable();
                }
            }
        }
    });
}

const buildDatabase = async (namespace: string) => {
    const nJSONSchema = finalJSON[namespace];
    for (let rootPredicate in nJSONSchema) {
        buildTable(rootPredicate, nJSONSchema[rootPredicate], namespace);
    }
};

export const generateDatabase = async (
    jsonSchemas: Array<JSONSchema4>,
    filename: string = ".tmp/standards.sqlite",
    sqlFilename: string = "",
    knexConnection: any,
    version: string = ""
) => {
    if (existsSync(filename)) {
        rmSync(filename);
    }

    if (existsSync(sqlFilename)) {
        rmSync(sqlFilename);
    }

    if (config.database.config.primary === "sqlite") {
        await knexConnection.raw('PRAGMA foreign_keys = ON');
        const fkPRAGMA = await knexConnection.raw('PRAGMA foreign_keys');
        if (!fkPRAGMA[0].foreign_keys) {
            throw Error("foreign key support not enabled.")
        }
    }

    tSchema = knexConnection.schema;
    for (let j = 0; j < jsonSchemas.length; j++) {
        const jsonSchema = jsonSchemas[j];
        let { $ref, definitions } = jsonSchema;
        let rootType = refRootName($ref);

        for (let rootPredicate in definitions) {
            const prop = definitions[rootPredicate];
            if (rootPredicate === rootType) {
                finalJSON[rootPredicate] = {};
                foreignKeys[rootPredicate] = {};
                builder(rootPredicate, prop, jsonSchema, rootPredicate);
                buildDatabase(rootPredicate);
            }
        }
    }

    tSchema.createTable("FILE_IMPORT_TABLE", function (table: any) {
        //TODO: Reference https://public.ccsds.org/Pubs/357x0b1.pdf
        table.string("CID").notNullable().primary();
        table.string("DIGITAL_SIGNATURE");
        table.string("ETH_ADDRESS");
        table.string("STANDARD");
        table.integer("RECORD_COUNT").unsigned().notNullable();
        table.timestamps();
    });

    return tSchema.then(() => {
        if (sqlFilename.length) {

            writeFileSync(
                sqlFilename,
                `/*${version}*/
` +
                tSchema
                    .toString()
                    .replaceAll(",", ",\n")
                    .replaceAll(";", ";\n\n")
                    .replaceAll("(", "(\n ")
            );
        }
    });

};

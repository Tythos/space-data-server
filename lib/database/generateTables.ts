import knexInit, { knex, Knex } from "knex";
import { writeFileSync, rmSync, existsSync } from "fs";
import { JSONSchema4 } from "json-schema";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";

let tSchema: Knex.SchemaBuilder;

let finalJSON: KeyValueDataStructure = {};
let foreignKeys: KeyValueDataStructure = {};

const knexNumberTypes: KeyValueDataStructure = {
    255: "tinyint",
    65535: "smallint",
    16777215: "mediumint",
    4294967295: "integer",
    18446744073709551615: "bigint",
};

const foreignTypes = ["object", "array", "union"];

const fTCheck = (ftPredicate: string) => ~foreignTypes.indexOf(ftPredicate);

export const refRootName = ($ref: string = ""): any => $ref.split("/").pop();

let resolver = (prop: JSONSchema4, jsonSchema: JSONSchema4): JSONSchema4 => {
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

const builder = (predicateName: string, predicate: JSONSchema4, jsonSchema: JSONSchema4, rootPredicate: string): any => {
    const { type, $ref, $$ref, properties, items } = predicate;
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
            type: predicate.type,
            $$ref,
            $ref,
        };
        for (let prop in properties) {
            let pprop = builder(prop, properties[prop], jsonSchema, rootPredicate);
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
        return builder(predicateName, items || {}, jsonSchema, rootPredicate);
    } else {
        return predicate;
    }
};

const builtTables: Array<string> = [];

const buildTable = (rootTableName: string, tableSchema: any) => {

    if (~builtTables.indexOf(rootTableName)) return;

    tSchema.createTable(rootTableName, function (table: any) {
        table.increments();
        table.timestamps();
        table.string("created_by").notNullable().defaultTo(0);
        table.string("updated_by").notNullable().defaultTo(0);
        for (let predicate in tableSchema) {
            const _predicate = tableSchema[predicate];
            if (!_predicate) continue;
            const { type, minimum, maximum } = _predicate;

            if (~["integer", "number"].indexOf(type)) {
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
                const { type, tableName } = foreignKeys[rootTableName][fProperty];
                if (type === "object") {
                    table.integer(fProperty).unsigned();
                    table
                        .foreign(fProperty)
                        .references(`${tableName}.id`)
                        .deferrable("deferred")
                        .onDelete("CASCADE");
                } else if (type === "array") {
                    table
                        .integer(`${fProperty}_id`)
                        .references('id')
                        .inTable(fProperty)
                        .notNullable()
                        .onDelete("CASCADE");
                }
            }
        }
        builtTables.push(rootTableName);
    });
}

const buildDatabase = async (namespace: string) => {
    const nJSONSchema = finalJSON[namespace];
    for (let rootPredicate in nJSONSchema) {
        buildTable(rootPredicate, nJSONSchema[rootPredicate]);
    }
};

export const generateDatabase = (
    jsonSchemas: Array<JSONSchema4>,
    filename: string = ".tmp/standards.sqlite",
    sqlFilename: string = ".tmp/standards.sql",
    connection: Knex.Config = {
        client: "better-sqlite3",
        useNullAsDefault: true,
        connection: {
            filename,
        },
    }
) => {

    if (existsSync(filename)) {
        rmSync(filename);
    }

    if (existsSync(sqlFilename)) {
        rmSync(sqlFilename);
    }

    let knexInstance: any = knexInit(connection);
    tSchema = knexInstance.schema;

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

    return tSchema.then(() => {
        writeFileSync(
            sqlFilename,
            tSchema
                .toString()
                .replaceAll(",", ",\n")
                .replaceAll(";", ";\n\n")
                .replaceAll("(", "(\n ")
        );
    });

};

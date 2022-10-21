import knexInit from "knex";
import { writeFileSync } from "fs";
let knex = knexInit({
  client: "better-sqlite3",
  connection: {
    filename: ":memory:",
  },
});
const { schema: tSchema } = knex;

let finalJSON = {};
let foreignKeys = {};

const knexNumberTypes = {
  255: "tinyint",
  65535: "smallint",
  16777215: "mediumint",
  4294967295: "integer",
  18446744073709551615: "bigint",
};

const foreignTypes = ["object", "array", "union"];

const fTCheck = (ftPredicate) => ~foreignTypes.indexOf(ftPredicate);

const refName = ($ref) => $ref.split("/").pop();

let resolver = (prop, jsonSchema) => {
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

const builder = (predicateName, predicate, jsonSchema, rootPredicate) => {
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
      predicateName = refName($$ref);
    }
    finalJSON[rootPredicate][predicateName] = {
      type: predicate.type,
      $$ref,
      $ref,
    };
    for (let prop in properties) {
      let pprop = builder(prop, properties[prop], jsonSchema, rootPredicate);
      let { type: ptype } = pprop;
      //console.log(ptype, ":", pprop, prop, properties[prop], predicateName);
      /**
       * Check each property to see if it is one of the types used to create a foreign key relationship:
       * - object: Create a one to one relationship, child foreign key ID stored in parent table row
       * - array: Create a one to many relationship, parent ID stored in child foreign key rows
       * - union: same as object
       *
       */

      if (fTCheck(properties[prop].type)) {
        foreignKeys[predicateName] = foreignKeys[predicateName] || {};
        foreignKeys[predicateName][prop] = {
          type: properties[prop].type,
          tableName: refName(pprop.$$ref),
        };
      }
    }
    return { type, $ref, $$ref };
  } else if (type === "array") {
    return builder(predicateName, items, jsonSchema, rootPredicate);
  } else {
    return predicate;
  }
};

const buildTable = (rootPredicate) => {
  let intermediateJSON = finalJSON[rootPredicate];
  let intermediateForeignKey = foreignKeys[rootPredicate];
  for (let rootPredicate in intermediateJSON) {
    tSchema.createTable(rootPredicate, function (table) {
      table.increments();
      table.timestamps();
      table.string("created_by").notNullable().defaultTo(0);
      table.string("updated_by").notNullable().defaultTo(0);
      for (let predicate in intermediateJSON[rootPredicate]) {
        const _predicate = intermediateJSON[rootPredicate][predicate];
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

      if (intermediateForeignKey[rootPredicate]) {
        for (let fpredicate in intermediateForeignKey[rootPredicate]) {
          const { type } = intermediateForeignKey[rootPredicate][fpredicate];
          if (type === "object") {
            table.integer(fpredicate).unsigned();
            table
              .foreign(fpredicate)
              .references(`${fpredicate}.id`)
              .deferrable("deferred")
              .onDelete("CASCADE");
          } else if (type === "array") {
            table.foreign(rootPredicate).references("id").inTable(fpredicate);
          }
        }
      }
    });
  }
};

export const generateDatabase = (jsonSchema, typeJSON) => {
  let { $ref, definitions } = jsonSchema;
  let rootType = refName($ref);

  for (let rootPredicate in definitions) {
    const prop = definitions[rootPredicate];
    if (rootPredicate === "OEM" && /**/ rootPredicate === rootType) {
      finalJSON[rootPredicate] = {};
      foreignKeys[rootPredicate] = {};
      builder(rootPredicate, prop, jsonSchema, rootPredicate);
      buildTable(rootPredicate);

      console.log(
        JSON.stringify(Object.keys(finalJSON[rootPredicate]), null, 4),
        JSON.stringify(foreignKeys, null, 4)
      );
    }
  }
  writeFileSync(
    `.tmp/standards.sql`,
    tSchema
      .toString()
      .replaceAll(",", ",\n")
      .replaceAll(";", ";\n\n")
      .replaceAll("(", "(\n ")
  );
};

import knexInit from "knex";
import { type } from "os";

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

const builder = (predicateName, predicate, jsonSchema) => {
  const { type, $ref, properties, items } = predicate;
  if ($ref) {
    return builder(predicateName, resolver(predicate, jsonSchema), jsonSchema);
  } else if (type === "object") {
    finalJSON[predicateName] = {};
    for (let prop in properties) {
      const pprop = properties[prop];
      if (fTCheck(pprop.type)) {
        let fKey = pprop.type === "object" ? predicateName : prop;
        let sfKey = pprop.type === "object" ? prop : predicateName;
        foreignKeys[fKey] = foreignKeys[fKey] || {};
        foreignKeys[fKey][sfKey] = pprop;
      }
      finalJSON[predicateName][prop] =
        pprop.$ref || fTCheck(pprop.type)
          ? builder(prop, pprop, jsonSchema)
          : pprop;
    }
  } else if (type === "array") {
    builder(predicateName, items, jsonSchema);
  } else {
    return predicate;
  }
};

const buildTable = () => {
  for (let rootPredicate in finalJSON) {
    tSchema.createTable(rootPredicate, function (table) {
      table.increments();
      table.timestamps();
      table.string("created_by").notNullable().defaultTo(0);
      table.string("updated_by").notNullable().defaultTo(0);
      for (let predicate in finalJSON[rootPredicate]) {
        const _predicate = finalJSON[rootPredicate][predicate];
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

      if (foreignKeys[rootPredicate]) {
        for (let fpredicate in foreignKeys[rootPredicate]) {
          const { type } = foreignKeys[rootPredicate][fpredicate];
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
  finalJSON = {};
  foreignKeys = {};
  let { $ref, definitions } = jsonSchema;
  let rootType = refName($ref);

  for (let x in definitions) {
    const prop = definitions[x];
    if (x === "OEM" && x === rootType) {
      builder(x, prop, jsonSchema);
    }
  }
  buildTable();
  console.log(tSchema.toString().replaceAll(",", ",\n"));
  /*console.log(
    JSON.stringify(finalJSON, null, 4),
    JSON.stringify(foreignKeys, null, 4)
  );*/
};

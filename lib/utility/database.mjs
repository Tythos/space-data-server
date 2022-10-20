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

let resolver = (prop, jsonSchema) => {
  let { $ref, $$ref, type, items } = prop;
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
    builder(predicateName, resolver(predicate, jsonSchema), jsonSchema);
  } else if (type === "object") {
    finalJSON[predicateName] = {};
    for (let prop in properties) {
      const pprop = properties[prop];
      if (fTCheck(pprop.type)) {
        foreignKeys[predicateName] = foreignKeys[predicateName] || [];
        foreignKeys[predicateName].push(prop);
      }
      finalJSON[predicateName][prop] =
        pprop.$ref || fTCheck(pprop.type)
          ? builder(prop, pprop, jsonSchema)
          : pprop;
    }
  } else if (type === "array") {
    builder(predicateName, items, jsonSchema);
  }
};
/*
function printAllVals(obj) {
  for (let k in obj) {
    if (typeof obj[k] === "object") {
      printAllVals(obj[k]);
    } else {
      // base case, stop recurring
      console.log(k, obj[k]);
    }
  }
}*/

export const generateDatabase = (jsonSchema, typeJSON) => {
  finalJSON = {};
  let { $ref, definitions } = jsonSchema;
  let rootType = $ref.split("/").pop();

  for (let x in definitions) {
    const prop = definitions[x];
    if (x === "OEM" && x === rootType) {
      builder(x, prop, jsonSchema);
    }
  }
  console.log(
    JSON.stringify(finalJSON, null, 4),
    JSON.stringify(foreignKeys, null, 4)
  );
};

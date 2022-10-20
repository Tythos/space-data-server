import knexInit from "knex";
import { type } from "os";

let knex = knexInit({
  client: "better-sqlite3",
  connection: {
    filename: ":memory:",
  },
});
const { schema: tSchema } = knex;

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
  if (items) {
    return resolver(items, jsonSchema);
  }
  if (!fTCheck(type) && !$ref) {
  } else if (fTCheck(type)) {
    let returnObj = { ...prop };
    for (let predicate in returnObj.properties) {
      returnObj[predicate] = resolver(
        returnObj.properties[predicate],
        jsonSchema
      );
    }
    return returnObj;
  } else {
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
    }
  }
};

const tableCreate = (jsonSchema) => {
  let returnJSON = { foreign: {} };
  let { $ref } = jsonSchema;
  if (!$ref)
    throw Error(
      `Input JSON Schema missing root $ref: ${JSON.stringify(
        jsonSchema,
        null,
        4
      ).slice(0, 500)}...`
    );
  let { properties } = resolver(jsonSchema, jsonSchema);
  let refKey = $ref.split("/").pop();
  returnJSON[refKey] = properties;
  for (let predicate in returnJSON[refKey]) {
    let _predicate = returnJSON[refKey][predicate];
    if (_predicate.$ref) {
      _predicate = resolver(_predicate, jsonSchema);
    }
    if (!_predicate) continue;
    if (fTCheck(_predicate.type)) {
      returnJSON.foreign[predicate] = resolver(_predicate, jsonSchema);
    }
  }
  return returnJSON;
};

const builtTables = [];
const buildTable = (tSchema, rootPredicate, intermediateJSON, foreignJSON) => {
  rootPredicate = intermediateJSON?.$$ref?.split("/").pop() || rootPredicate;

  if (~builtTables.indexOf(rootPredicate)) return;
  tSchema.createTable(rootPredicate, function (table) {
    table.increments();
    table.timestamps();
    table.string("created_by").notNullable().defaultTo(0);
    table.string("updated_by").notNullable().defaultTo(0);
    for (let predicate in intermediateJSON) {
      if (!intermediateJSON[predicate]) continue;
      const { type, minimum, maximum } = intermediateJSON[predicate];
      if (type === "object") {
        builder(predicate, intermediateJSON[predicate]);
      } else {
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
    }
    if (foreignJSON) {
      for (let fpredicate in foreignJSON) {
        const { $$ref } = foreignJSON[fpredicate];
        const fName = $$ref.split("/").pop();
        table.integer(fpredicate).unsigned();
        table
          .foreign(fpredicate)
          .references(`${fName}.id`)
          .deferrable("deferred")
          .onDelete("CASCADE");
      }
    }
  });
  builtTables.push(rootPredicate);
};
const recursiveBuilder = (tSchema, rootPredicate, intermediateJSON) => {
  for (let predicate in intermediateJSON) {
    if (predicate !== "foreign") {
      buildTable(
        tSchema,
        predicate,
        intermediateJSON[predicate],
        intermediateJSON?.foreign
      );
    }
  }
  if (intermediateJSON?.foreign) {
    for (let fpredicate in intermediateJSON.foreign) {
      buildTable(
        tSchema,
        fpredicate,
        intermediateJSON.foreign[fpredicate],
        null
      );
    }
  }
};

const builder = async (name, prop, jsonSchema) => {
  //enum: Use https://knexjs.org/guide/schema-builder.html#checkin
  let finalJSON = tableCreate(jsonSchema);

  recursiveBuilder(tSchema, name, finalJSON);

  console.log(tSchema.toString().replaceAll(",", ",\n"));
};
//let hasTestGen = false;
export const generateDatabase = (jsonSchema, typeJSON) => {
  let { definitions } = jsonSchema;

  for (let x in definitions) {
    const prop = definitions[x];
    if (~x.toUpperCase().indexOf("COLLECTION")) {
      continue;
    }

    if (x === "OEM" && prop.type === "object") {
      builder(x, prop, jsonSchema);
    }
  }
  /*if (!hasTestGen) {
    builder(
      "TYPECHECK",
      typeJSON.definitions["TypeChecker_TypeCheck"],
      typeJSON
    );
    hasTestGen = true;
  }*/
};

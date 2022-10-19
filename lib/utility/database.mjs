import knexInit from "knex";
import { type } from "os";

let knex = knexInit({
  client: "better-sqlite3",
  connection: {
    filename: ":memory:",
  },
});
const { schema } = knex;
const jsonSchemaPrimitives = ["string", "number", "integer", "boolean", "null"];
const foreignTypes = ["object", "array", "union"];
const fTCheck = (ftPredicate) => !~foreignTypes.indexOf(ftPredicate);
const translator = { number: "float" };

let resolver = (prop, jsonSchema) => {
  let { $ref, $$ref, type } = prop;
  if (fTCheck(type) && !$ref) {
    return prop;
  } else if (type === "object") {
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
    const { type } = _predicate;
    if (type === "object") {
      returnJSON.foreign[predicate] = resolver(_predicate, jsonSchema);
    }
  }
  return returnJSON;
};

const buildTable = (
  tSchema,
  predicate,
  intermediateJSON,
  foreignJSON,
  parentTable
) => {
  console.log(predicate, foreignJSON);
  tSchema.createTable(predicate, async function (table) {
    table.increments();
    table.timestamps();
    table.string("created_by").notNullable().defaultTo(0);
    table.string("updated_by").notNullable().defaultTo(0);
    for (let predicate in intermediateJSON) {
      // console.log(predicate, intermediateJSON[predicate]);
    }
    if (parentTable) {
      table
        .integer("id")
        .notNullable()
        .references(predicate)
        .inTable(parentTable)
        .onDelete("CASCADE");
    }
    if (foreignJSON) {
      for (let fpredicate in foreignJSON) {
        const { $$ref } = foreignJSON[fpredicate];
        const fName = $$ref.split("/").pop();
        table.integer(fpredicate).unsigned();
        table
          .foreign(fpredicate)
          .references(`${fName}.id`)
          .deferrable("deferred");
      }
    }
  });
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
        intermediateJSON.foreign,
        null,
        rootPredicate
      );
    }
  }
};

const builder = async (name, prop, jsonSchema) => {
  //enum: Use https://knexjs.org/guide/schema-builder.html#checkin
  let finalJSON = tableCreate(jsonSchema);

  let tSchema = schema;
  recursiveBuilder(tSchema, name, finalJSON);

  console.log(tSchema.toString());
};

export const generateDatabase = (jsonSchema, typeJSON) => {
  let { definitions } = jsonSchema;

  for (let x in definitions) {
    const prop = definitions[x];
    if (~x.toUpperCase().indexOf("COLLECTION")) {
      continue;
    }

    if (x === "CDM" && prop.type === "object") {
      builder(x, prop, jsonSchema);
      // console.log(x, definitions[x].type);
      //console.log(JSON.stringify(definitions[x], null, 4));
    }
  }
};

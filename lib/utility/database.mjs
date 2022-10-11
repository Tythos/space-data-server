import knexInit from "knex";

let knex = knexInit({
  client: "better-sqlite3",
  filename: ":memory:",
});

const jsonSchemaPrimitives = ["string", "number", "integer", "boolean", "null"];

export const generateDatabase = (jsonSchema) => {
  let tables = {};
  let { definitions } = jsonSchema;

  let resolver = (prop, parent) => {
    let { $ref, type, properties } = prop;
    if (~jsonSchemaPrimitives.indexOf(type)) {
      return prop;
    } else {
      if ($ref) {
        let rpath = $ref.split("/").slice(1);
        let fprop = jsonSchema;
        for (let i = 0; i < rpath.length; i++) {
          fprop = fprop[rpath[i]];
        }
        return resolver(fprop, jsonSchema);
      } else if (type === "object") {
        for (let p in properties) {
          properties[p] = resolver(properties[p], prop);
        }
      } else if (type === "array") {
      }
    }
  };

  let parser = (name, prop) => {
    //enum: Use https://knexjs.org/guide/schema-builder.html#checkin
    /**
     *  string
     *  number
     *  integer
     *  object
     *  array
     *  boolean
     *  null
     */
  };

  for (let x in definitions) {
    if (~x.toUpperCase().indexOf("COLLECTION")) {
      delete definitions[x];
      continue;
    }
    let prop = resolver(definitions[x], jsonSchema);
    parser(x, prop);
  }
  console.log(JSON.stringify(jsonSchema, null, 4));
};

import knexInit from "knex";

let knex = knexInit({
  client: "better-sqlite3",
  connection: {
    filename: ":memory:",
  },
});
const { schema } = knex;
const jsonSchemaPrimitives = ["string", "number", "integer", "boolean", "null"];
const foreignTypes = ["object", "array"];
const fTCheck = (ftPredicate) => !~foreignTypes.indexOf(ftPredicate);
const translator = { number: "float" };

let builder = async (name, prop) => {
  const { type, properties, additionalProperties } = prop;
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

  const query = schema
    .createTable(name, function (table) {
      table.increments();

      for (let predicate in properties) {
        const { type: ptype, $ref } = properties[predicate];
        if (fTCheck(ptype) && !$ref) {
          let ttype = translator[ptype] || ptype;
          if (!table[ttype]) {
            throw Error(
              `Unknown predicate type "${ttype}" in schema reference: ${name}`
            );
          }
          table[ttype](predicate);
          console.log(predicate, $ref, ptype);
        }
      }
    })
    .toString();
  console.log(query);
};

let resolver = (prop, parent) => {
  let { $ref, $$ref, type, properties } = prop;
  if (~jsonSchemaPrimitives.indexOf(type)) {
    return prop;
  } else {
    if ($ref && fTCheck(type)) {
      let rpath = $ref.split("/").slice(1);
      let fprop = jsonSchema;
      for (let i = 0; i < rpath.length; i++) {
        fprop = fprop[rpath[i]];
      }
      fprop.$$ref = $ref || $$ref;
      return resolver(fprop, jsonSchema);
    } /*else if (type === "object") {
      for (let p in properties) {
        properties[p] = resolver(properties[p], prop);
      }
    } else if (type === "array") {
    }*/
  }
};

export const generateDatabase = (jsonSchema) => {
  let tables = {};
  let { definitions } = jsonSchema;

  for (let x in definitions) {
    const prop = definitions[x];
    if (~x.toUpperCase().indexOf("COLLECTION")) {
      continue;
    }

    if (x === "CDM" && prop.type === "object") {
      resolver(prop, jsonSchema);
      builder(x, prop);
      // console.log(x, definitions[x].type);

      //console.log(JSON.stringify(definitions[x], null, 4));
    }
  }
};

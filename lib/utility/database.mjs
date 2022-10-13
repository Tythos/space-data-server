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

let resolver = (prop, jsonSchema) => {
  let { $ref, $$ref, type } = prop;
  if (~jsonSchemaPrimitives.indexOf(type)) {
    return prop;
  } else {
    if ($ref) {
      let rpath = $ref.split("/").slice(1);
      let fprop = jsonSchema;
      for (let i = 0; i < rpath.length; i++) {
        fprop = fprop[rpath[i]];
      }
      fprop.$$ref = $ref || $$ref;
      return resolver(fprop, jsonSchema);
    }
  }
};

let builder = async (name, prop, jsonSchema) => {
  const { properties } = prop;
  //enum: Use https://knexjs.org/guide/schema-builder.html#checkin

  let queries = [];
  queries.push(
    schema.createTable(name, function (table) {
      table.increments();
      table.timestamps();
      table.string("owner").notNullable().defaultTo(0);
      for (let predicate in properties) {
        let _predicate = properties[predicate];
        if (_predicate.$ref) {
          console.log(_predicate);
          _predicate = resolver(_predicate, jsonSchema);
          console.log(predicate, _predicate);
        }
        if (!_predicate) continue;
        const { type } = _predicate;
        if (fTCheck(type)) {
          let ttype = translator[type] || type;
          if (!table[ttype]) {
            throw Error(
              `Unknown predicate type "${ttype}" in schema reference: ${name}`
            );
          }
          table[ttype](predicate);
        }
      }
    })
  );
  console.log(
    queries
      .map((q) => q.toString().replace("(", "(\n").split(",").join(",\n"))
      .join(new Array(60).join("-") + "\n")
  );
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
      builder(x, prop, jsonSchema);
      // console.log(x, definitions[x].type);

      //console.log(JSON.stringify(definitions[x], null, 4));
    }
  }
};

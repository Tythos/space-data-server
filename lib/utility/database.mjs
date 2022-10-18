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
        fprop = fprop[rpath[i]];
      }
      fprop.$$ref = $ref || $$ref;
      return resolver(fprop, jsonSchema);
    }
  }
};

const tableCreate = (table, properties) => {
  /**
      for (let predicate in properties) {
      let _predicate = properties[predicate];
      if (_predicate.$ref) {
        _predicate = resolver(_predicate, jsonSchema);
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
        let newProp = table[ttype](predicate);
        if (_predicate.minimum === "0") {
          newProp.unsigned();
        }
      } else if (type === "object") {
        table.integer(`${predicate}_id`).unsigned();
        let nTP = resolver(_predicate, jsonSchema);
      }
    }
   */
};

const builder = async (name, prop, jsonSchema) => {
  //enum: Use https://knexjs.org/guide/schema-builder.html#checkin

  let queries = [];
  let finalJSON = [name, "test"];

  let tSchema = schema;

  for (let i = 0; i < finalJSON.length; i++) {
    tSchema.createTable(finalJSON[i], async function (table) {
      table.increments();

      table.timestamps();

      table.string("owner").notNullable().defaultTo(0);
    });
  }

  console.log(
    tSchema.toString()
    /*.reverse()
      .map((q) => q.toString().replace("(", "(\n").split(",").join(",\n"))
      .join(new Array(60).join("-") + "\n")*/
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
      builder(x, prop, jsonSchema);
      // console.log(x, definitions[x].type);
      //console.log(JSON.stringify(definitions[x], null, 4));
    }
  }
};

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var generateTables_exports = {};
__export(generateTables_exports, {
  fTCheck: () => fTCheck,
  generateDatabase: () => generateDatabase,
  refRootName: () => refRootName,
  resolver: () => resolver
});
module.exports = __toCommonJS(generateTables_exports);
var import_fs = require("fs");
let tSchema;
let finalJSON = {};
let foreignKeys = {};
const knexNumberTypes = {
  255: "tinyint",
  65535: "smallint",
  16777215: "mediumint",
  4294967295: "integer",
  18446744073709552e3: "bigint"
};
const foreignTypes = ["object", "array", "union"];
const fTCheck = (ftPredicate) => ~foreignTypes.indexOf(ftPredicate);
const refRootName = ($ref = "") => $ref.split("/").pop();
const resolver = (prop, jsonSchema) => {
  prop = prop?.items || prop;
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
      predicateName = refRootName($$ref);
    }
    finalJSON[rootPredicate][predicateName] = {
      type: predicate.type,
      $$ref,
      $ref
    };
    for (let prop in properties) {
      let pprop = builder(prop, properties[prop], jsonSchema, rootPredicate);
      if (fTCheck(pprop.type)) {
        if (pprop.type === "object") {
          foreignKeys[predicateName] = foreignKeys[predicateName] || {};
          foreignKeys[predicateName][prop] = {
            type: pprop.type,
            tableName: refRootName(pprop.$$ref)
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
const builtTables = [];
const buildTable = (rootTableName, tableSchema) => {
  if (~builtTables.indexOf(rootTableName))
    return;
  tSchema.createTable(rootTableName, function(table) {
    table.integer("id").notNullable().unsigned().primary();
    table.timestamps(true, true);
    for (let predicate in tableSchema) {
      const _predicate = tableSchema[predicate];
      if (!_predicate)
        continue;
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
    if (foreignKeys[rootTableName] && Object.keys(foreignKeys[rootTableName])) {
      for (let fProperty in foreignKeys[rootTableName]) {
        const { type, tableName } = foreignKeys[rootTableName][fProperty];
        if (type === "object") {
          table.integer(fProperty).unsigned();
          table.foreign(fProperty).references(`${tableName}.id`).deferrable("deferred").onDelete("CASCADE");
        } else if (type === "array") {
          table.integer(`${fProperty}_id`).references("id").inTable(fProperty).notNullable().onDelete("CASCADE");
        }
      }
    }
    builtTables.push(rootTableName);
  });
};
const buildDatabase = async (namespace) => {
  const nJSONSchema = finalJSON[namespace];
  for (let rootPredicate in nJSONSchema) {
    buildTable(rootPredicate, nJSONSchema[rootPredicate]);
  }
};
const generateDatabase = (jsonSchemas, filename = ".tmp/standards.sqlite", sqlFilename = ".tmp/standards.sql", knexConnection) => {
  if ((0, import_fs.existsSync)(filename)) {
    (0, import_fs.rmSync)(filename);
  }
  if ((0, import_fs.existsSync)(sqlFilename)) {
    (0, import_fs.rmSync)(sqlFilename);
  }
  tSchema = knexConnection.schema;
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
    (0, import_fs.writeFileSync)(
      sqlFilename,
      tSchema.toString().replaceAll(",", ",\n").replaceAll(";", ";\n\n").replaceAll("(", "(\n ")
    );
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fTCheck,
  generateDatabase,
  refRootName,
  resolver
});

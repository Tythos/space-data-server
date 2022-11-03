"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_globals = require("@jest/globals");
var import_generateTables = require("../lib/database/generateTables");
var import_knex = __toESM(require("knex"));
var import_fs = require("fs");
var standards = __toESM(require("../lib/standards/standards"));
var import_faker = require("@faker-js/faker");
const standardsJSON = JSON.parse((0, import_fs.readFileSync)("./lib/standards/schemas.json", "utf-8"));
const filename = "./test/output/standards.sqlite";
const sqlfilename = "./test/output/standards.sql";
const fDT = import_faker.faker.datatype;
let knexConnection;
let standardsArray = Object.values(standardsJSON);
(0, import_globals.beforeAll)(async () => {
  knexConnection = (0, import_knex.default)({
    client: "better-sqlite3",
    connection: { filename },
    useNullAsDefault: true
  });
  await (0, import_generateTables.generateDatabase)(standardsArray, filename, sqlfilename, knexConnection);
  await knexConnection("CAT").select("*");
});
(0, import_globals.describe)("Test Generation", () => {
  (0, import_globals.test)("Generate Database With Correct Tables", async () => {
    for (let s = 0; s < standardsArray.length; s++) {
      let tableName = (0, import_generateTables.refRootName)(standardsArray[s].$ref);
      let cI = await knexConnection(tableName).columnInfo();
      (0, import_globals.expect)(Object.keys(cI).length).toBeGreaterThan(0);
    }
  });
});
(0, import_globals.describe)("Test Data Entry", () => {
  const buildProp = (prop, propName) => {
    let { type, minimum: min, maximum: max } = prop;
    let fakerValue = null;
    if (type === "integer") {
      fakerValue = fDT.number({ min, max });
    } else if (type === "number") {
      fakerValue = fDT.float();
    } else if (type === "boolean") {
      fakerValue = fDT.boolean();
    } else if (type === "string") {
      if (~propName.indexOf("_DATE") || ~propName.indexOf("EPOCH") || propName.indexOf("TIME") > 0 || ~propName.indexOf("TCA")) {
        fakerValue = fDT.datetime().toISOString();
      } else if (~propName.indexOf("ORIGINATOR") || ~propName.indexOf("MESSAGE_FOR")) {
        fakerValue = import_faker.faker.company.name();
      } else if (~propName.indexOf("REF_FRAME")) {
        import_faker.faker.helpers.arrayElement([
          "ICRF",
          "ITRF-93",
          "ITRF-97",
          "ITRF2000",
          "TOD",
          "EME2000",
          "TDR",
          "GRC"
        ]);
      } else {
        fakerValue = import_faker.faker.datatype.hexadecimal();
      }
    }
    return fakerValue;
  };
  const buildObject = (classProperties, parentClass, tableName, jsonSchema) => {
    let newObject = new parentClass[tableName]();
    for (let x in classProperties) {
      let resolvedProp = (0, import_generateTables.resolver)(classProperties[x]?.items || classProperties[x], jsonSchema);
      if (!(0, import_generateTables.fTCheck)(resolvedProp?.type)) {
        newObject[x] = buildProp(resolvedProp, x);
      } else if (resolvedProp?.type === "object" && classProperties[x]?.type !== "array") {
        newObject[x] = buildObject(resolvedProp.properties, parentClass, (0, import_generateTables.refRootName)(resolvedProp.$$ref), jsonSchema);
      } else if (classProperties[x]?.type === "array") {
        newObject[x] = [];
        for (let i = 0; i < 2; i++) {
          let aObject = !(0, import_generateTables.fTCheck)(resolvedProp?.type) ? buildProp(resolvedProp, x) : buildObject(
            resolvedProp?.items || resolvedProp.properties,
            parentClass,
            (0, import_generateTables.refRootName)(resolvedProp.$$ref),
            jsonSchema
          );
          newObject[x].push(aObject);
        }
      }
    }
    return newObject;
  };
  const buildQuery = async (tableName, queryArray, standardsSchema, resultObject = { tableOrder: [] }, runQuery = true) => {
    console.log("entry", tableName, queryArray);
    if (!tableName) {
      throw Error(`Missing Table Name for Data Like: ${JSON.stringify(queryArray[0], null, 4)}`);
    }
    if (!~resultObject.tableOrder.indexOf(tableName)) {
      resultObject.tableOrder.unshift(tableName);
    }
    resultObject[tableName] = [];
    const { startID } = await knexConnection(tableName).max("id as startID").first();
    const foreignProperties = {};
    let tableDefinition = standardsSchema.definitions ? standardsSchema.definitions[tableName] : null;
    if (!tableDefinition) {
      throw Error(`Attempted to Run Query on non-existent table definition: ${tableName}`);
    }
    for (let prop in tableDefinition.properties) {
      const { type: pType } = tableDefinition.properties[prop];
      const { type, $$ref } = (0, import_generateTables.resolver)(tableDefinition.properties[prop], standardsSchema);
      if ((0, import_generateTables.fTCheck)(type)) {
        foreignProperties[(0, import_generateTables.refRootName)($$ref)] = foreignProperties[(0, import_generateTables.refRootName)($$ref)] || { fields: {}, fStartID: null, type, pType };
        foreignProperties[(0, import_generateTables.refRootName)($$ref)].fields[prop] = {};
      }
    }
    for (let fTable in foreignProperties) {
      foreignProperties[fTable].fStartID = await knexConnection(fTable).max("id as fStartID").first().fStartID || 0;
    }
    for (let i = 0; i < queryArray.length; i++) {
      delete queryArray[i].bb;
      delete queryArray[i].bb_pos;
      queryArray[i].id = queryArray[i].id > -1 ? queryArray[i].id : (startID ? startID : 0) + i;
      resultObject[tableName].push(queryArray[i]);
      for (let fTable in foreignProperties) {
        resultObject[fTable] = resultObject[fTable] || [];
        let { fields, type: fType, pType } = foreignProperties[fTable];
        if (pType === "object") {
          for (let fieldName in fields) {
            queryArray[i][fieldName].id = foreignProperties[fTable].fStartID++;
            resultObject[fTable].push({ ...queryArray[i][fieldName] });
            queryArray[i][fieldName] = queryArray[i][fieldName].id;
          }
        } else if (pType === "array") {
          for (let fieldName in fields) {
            if (!queryArray[i][fieldName]?.length) {
              throw Error(`${fieldName} ${JSON.stringify(queryArray[i], null, 4)} ${JSON.stringify(foreignProperties, null, 4)}`);
            }
            for (let a = 0; a < queryArray[i][fieldName].length; a++) {
              queryArray[i][fieldName][a][`${tableName}_id`] = queryArray[i].id;
              resultObject[fTable].push({ ...queryArray[i][fieldName][a] });
            }
          }
        }
        resultObject = await buildQuery(fTable, resultObject[fTable], standardsSchema, resultObject, false);
      }
    }
    let pageSize = 100;
    if (runQuery) {
      for (let t = 0; t < resultObject.tableOrder.length; t++) {
        const nTable = resultObject.tableOrder[t];
        for (let x = 0; x < resultObject[nTable].length; x += pageSize) {
          await knexConnection(nTable).insert(resultObject[nTable].slice(x, x + pageSize));
        }
      }
    }
    return resultObject;
  };
  (0, import_globals.test)("Enter Data For Each Data Type", async () => {
    let standard;
    let total = 3;
    let returnCount = 0;
    for (standard in standards) {
      if (standard !== "OEM")
        continue;
      let currentStandard = standardsJSON[standard];
      let tableName = (0, import_generateTables.refRootName)(currentStandard.$ref);
      let pClassName = `${tableName}`;
      let parentClass = standards[pClassName];
      let cClassName = `${tableName}COLLECTIONT`;
      let standardCollection = new parentClass[cClassName]();
      for (let i = 0; i < total; i++) {
        let newObject = buildObject(currentStandard.definitions[tableName].properties, parentClass, tableName, currentStandard);
        standardCollection.RECORDS.push(newObject);
      }
      await buildQuery(tableName, standardCollection.RECORDS, currentStandard);
      let resultQuery = await knexConnection(tableName).select("*");
      if (standard.indexOf("CDM") === 0) {
        let foreignKeys = ["OBJECT1", "OBJECT2"];
        let CDMObjects = await knexConnection("CDMObject").whereIn("id", resultQuery.map((e) => foreignKeys.map((fK) => e[fK])).flat());
        let CDMObjectsHash = {};
        for (let c = 0; c < CDMObjects.length; c++) {
          CDMObjectsHash[CDMObjects[c].id] = CDMObjects[c];
        }
        for (let t = 0; t < resultQuery.length; t++) {
          for (let fK = 0; fK < foreignKeys.length; fK++) {
            resultQuery[t][foreignKeys[fK]] = CDMObjectsHash[resultQuery[t][foreignKeys[fK]]];
          }
        }
      }
      returnCount += resultQuery.length;
    }
    (0, import_globals.expect)(returnCount).toEqual(total * Object.keys(standards).length);
  });
});

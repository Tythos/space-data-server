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
var main_exports = {};
__export(main_exports, {
  SATCAT: () => import_SATCAT.SATCAT,
  SATCATCOLLECTION: () => import_SATCATCOLLECTION.SATCATCOLLECTION,
  SATCATCOLLECTIONT: () => import_SATCATCOLLECTION.SATCATCOLLECTIONT,
  SATCATT: () => import_SATCAT.SATCATT,
  dataStatusCode: () => import_dataStatusCode.dataStatusCode,
  massType: () => import_massType.massType,
  objectType: () => import_objectType.objectType,
  opsStatusCode: () => import_opsStatusCode.opsStatusCode,
  orbitType: () => import_orbitType.orbitType
});
module.exports = __toCommonJS(main_exports);
var import_SATCAT = require("./SATCAT");
var import_SATCATCOLLECTION = require("./SATCATCOLLECTION");
var import_dataStatusCode = require("./dataStatusCode");
var import_massType = require("./massType");
var import_objectType = require("./objectType");
var import_opsStatusCode = require("./opsStatusCode");
var import_orbitType = require("./orbitType");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SATCAT,
  SATCATCOLLECTION,
  SATCATCOLLECTIONT,
  SATCATT,
  dataStatusCode,
  massType,
  objectType,
  opsStatusCode,
  orbitType
});

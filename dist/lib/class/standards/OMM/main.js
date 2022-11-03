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
  MPE: () => import_MPE.MPE,
  MPECOLLECTION: () => import_MPECOLLECTION.MPECOLLECTION,
  MPECOLLECTIONT: () => import_MPECOLLECTION.MPECOLLECTIONT,
  MPET: () => import_MPE.MPET,
  OMM: () => import_OMM.OMM,
  OMMCOLLECTION: () => import_OMMCOLLECTION.OMMCOLLECTION,
  OMMCOLLECTIONT: () => import_OMMCOLLECTION.OMMCOLLECTIONT,
  OMMT: () => import_OMM.OMMT,
  ephemerisType: () => import_ephemerisType.ephemerisType,
  manCovRefFrame: () => import_manCovRefFrame.manCovRefFrame,
  meanElementTheory: () => import_meanElementTheory.meanElementTheory,
  referenceFrame: () => import_referenceFrame.referenceFrame,
  timeSystem: () => import_timeSystem.timeSystem
});
module.exports = __toCommonJS(main_exports);
var import_MPE = require("./MPE");
var import_MPECOLLECTION = require("./MPECOLLECTION");
var import_OMM = require("./OMM");
var import_OMMCOLLECTION = require("./OMMCOLLECTION");
var import_ephemerisType = require("./ephemerisType");
var import_manCovRefFrame = require("./manCovRefFrame");
var import_meanElementTheory = require("./meanElementTheory");
var import_referenceFrame = require("./referenceFrame");
var import_timeSystem = require("./timeSystem");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MPE,
  MPECOLLECTION,
  MPECOLLECTIONT,
  MPET,
  OMM,
  OMMCOLLECTION,
  OMMCOLLECTIONT,
  OMMT,
  ephemerisType,
  manCovRefFrame,
  meanElementTheory,
  referenceFrame,
  timeSystem
});

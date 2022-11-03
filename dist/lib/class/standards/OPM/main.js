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
  OPM: () => import_OPM.OPM,
  OPMCOLLECTION: () => import_OPMCOLLECTION.OPMCOLLECTION,
  OPMCOLLECTIONT: () => import_OPMCOLLECTION.OPMCOLLECTIONT,
  OPMT: () => import_OPM.OPMT,
  manCovRefFrame: () => import_manCovRefFrame.manCovRefFrame,
  maneuverParameters: () => import_maneuverParameters.maneuverParameters,
  maneuverParametersT: () => import_maneuverParameters.maneuverParametersT,
  referenceFrame: () => import_referenceFrame.referenceFrame,
  timeSystem: () => import_timeSystem.timeSystem
});
module.exports = __toCommonJS(main_exports);
var import_OPM = require("./OPM");
var import_OPMCOLLECTION = require("./OPMCOLLECTION");
var import_manCovRefFrame = require("./manCovRefFrame");
var import_maneuverParameters = require("./maneuverParameters");
var import_referenceFrame = require("./referenceFrame");
var import_timeSystem = require("./timeSystem");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OPM,
  OPMCOLLECTION,
  OPMCOLLECTIONT,
  OPMT,
  manCovRefFrame,
  maneuverParameters,
  maneuverParametersT,
  referenceFrame,
  timeSystem
});

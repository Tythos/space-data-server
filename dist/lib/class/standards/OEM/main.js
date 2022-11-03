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
  OEM: () => import_OEM.OEM,
  OEMCOLLECTION: () => import_OEMCOLLECTION.OEMCOLLECTION,
  OEMCOLLECTIONT: () => import_OEMCOLLECTION.OEMCOLLECTIONT,
  OEMT: () => import_OEM.OEMT,
  covarianceMatrixLine: () => import_covarianceMatrixLine.covarianceMatrixLine,
  covarianceMatrixLineT: () => import_covarianceMatrixLine.covarianceMatrixLineT,
  ephemerisDataBlock: () => import_ephemerisDataBlock.ephemerisDataBlock,
  ephemerisDataBlockT: () => import_ephemerisDataBlock.ephemerisDataBlockT,
  ephemerisDataLine: () => import_ephemerisDataLine.ephemerisDataLine,
  ephemerisDataLineT: () => import_ephemerisDataLine.ephemerisDataLineT,
  manCovRefFrame: () => import_manCovRefFrame.manCovRefFrame,
  referenceFrame: () => import_referenceFrame.referenceFrame,
  timeSystem: () => import_timeSystem.timeSystem
});
module.exports = __toCommonJS(main_exports);
var import_OEM = require("./OEM");
var import_OEMCOLLECTION = require("./OEMCOLLECTION");
var import_covarianceMatrixLine = require("./covarianceMatrixLine");
var import_ephemerisDataBlock = require("./ephemerisDataBlock");
var import_ephemerisDataLine = require("./ephemerisDataLine");
var import_manCovRefFrame = require("./manCovRefFrame");
var import_referenceFrame = require("./referenceFrame");
var import_timeSystem = require("./timeSystem");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OEM,
  OEMCOLLECTION,
  OEMCOLLECTIONT,
  OEMT,
  covarianceMatrixLine,
  covarianceMatrixLineT,
  ephemerisDataBlock,
  ephemerisDataBlockT,
  ephemerisDataLine,
  ephemerisDataLineT,
  manCovRefFrame,
  referenceFrame,
  timeSystem
});

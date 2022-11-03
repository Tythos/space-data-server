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
  CDM: () => import_CDM.CDM,
  CDMCOLLECTION: () => import_CDMCOLLECTION.CDMCOLLECTION,
  CDMCOLLECTIONT: () => import_CDMCOLLECTION.CDMCOLLECTIONT,
  CDMObject: () => import_CDMObject.CDMObject,
  CDMObjectT: () => import_CDMObject.CDMObjectT,
  CDMT: () => import_CDM.CDMT,
  covarianceMethod: () => import_covarianceMethod.covarianceMethod,
  maneuverableType: () => import_maneuverableType.maneuverableType,
  objectCenteredReferenceFrame: () => import_objectCenteredReferenceFrame.objectCenteredReferenceFrame,
  objectNumber: () => import_objectNumber.objectNumber,
  objectType: () => import_objectType.objectType,
  referenceFrame: () => import_referenceFrame.referenceFrame,
  screeningVolumeShape: () => import_screeningVolumeShape.screeningVolumeShape
});
module.exports = __toCommonJS(main_exports);
var import_CDM = require("./CDM");
var import_CDMCOLLECTION = require("./CDMCOLLECTION");
var import_CDMObject = require("./CDMObject");
var import_covarianceMethod = require("./covarianceMethod");
var import_maneuverableType = require("./maneuverableType");
var import_objectCenteredReferenceFrame = require("./objectCenteredReferenceFrame");
var import_objectNumber = require("./objectNumber");
var import_objectType = require("./objectType");
var import_referenceFrame = require("./referenceFrame");
var import_screeningVolumeShape = require("./screeningVolumeShape");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CDM,
  CDMCOLLECTION,
  CDMCOLLECTIONT,
  CDMObject,
  CDMObjectT,
  CDMT,
  covarianceMethod,
  maneuverableType,
  objectCenteredReferenceFrame,
  objectNumber,
  objectType,
  referenceFrame,
  screeningVolumeShape
});

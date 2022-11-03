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
var ephemerisType_exports = {};
__export(ephemerisType_exports, {
  ephemerisType: () => ephemerisType
});
module.exports = __toCommonJS(ephemerisType_exports);
var ephemerisType = /* @__PURE__ */ ((ephemerisType2) => {
  ephemerisType2[ephemerisType2["SGP"] = 0] = "SGP";
  ephemerisType2[ephemerisType2["SGP4"] = 1] = "SGP4";
  ephemerisType2[ephemerisType2["SDP4"] = 2] = "SDP4";
  ephemerisType2[ephemerisType2["SGP8"] = 3] = "SGP8";
  ephemerisType2[ephemerisType2["SDP8"] = 4] = "SDP8";
  return ephemerisType2;
})(ephemerisType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ephemerisType
});

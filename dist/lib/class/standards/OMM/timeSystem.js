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
var timeSystem_exports = {};
__export(timeSystem_exports, {
  timeSystem: () => timeSystem
});
module.exports = __toCommonJS(timeSystem_exports);
var timeSystem = /* @__PURE__ */ ((timeSystem2) => {
  timeSystem2[timeSystem2["GMST"] = 0] = "GMST";
  timeSystem2[timeSystem2["GPS"] = 1] = "GPS";
  timeSystem2[timeSystem2["MET"] = 2] = "MET";
  timeSystem2[timeSystem2["MRT"] = 3] = "MRT";
  timeSystem2[timeSystem2["SCLK"] = 4] = "SCLK";
  timeSystem2[timeSystem2["TAI"] = 5] = "TAI";
  timeSystem2[timeSystem2["TCB"] = 6] = "TCB";
  timeSystem2[timeSystem2["TDB"] = 7] = "TDB";
  timeSystem2[timeSystem2["TCG"] = 8] = "TCG";
  timeSystem2[timeSystem2["TT"] = 9] = "TT";
  timeSystem2[timeSystem2["UT1"] = 10] = "UT1";
  timeSystem2[timeSystem2["UTC"] = 11] = "UTC";
  return timeSystem2;
})(timeSystem || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  timeSystem
});

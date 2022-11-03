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
var orbitType_exports = {};
__export(orbitType_exports, {
  orbitType: () => orbitType
});
module.exports = __toCommonJS(orbitType_exports);
var orbitType = /* @__PURE__ */ ((orbitType2) => {
  orbitType2[orbitType2["ORBIT"] = 0] = "ORBIT";
  orbitType2[orbitType2["LANDING"] = 1] = "LANDING";
  orbitType2[orbitType2["IMPACT"] = 2] = "IMPACT";
  orbitType2[orbitType2["DOCKED"] = 3] = "DOCKED";
  orbitType2[orbitType2["ROUNDTRIP"] = 4] = "ROUNDTRIP";
  return orbitType2;
})(orbitType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  orbitType
});

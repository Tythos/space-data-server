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
var objectType_exports = {};
__export(objectType_exports, {
  objectType: () => objectType
});
module.exports = __toCommonJS(objectType_exports);
var objectType = /* @__PURE__ */ ((objectType2) => {
  objectType2[objectType2["PAYLOAD"] = 0] = "PAYLOAD";
  objectType2[objectType2["ROCKET_BODY"] = 1] = "ROCKET_BODY";
  objectType2[objectType2["DEBRIS"] = 2] = "DEBRIS";
  objectType2[objectType2["UNKNOWN"] = 3] = "UNKNOWN";
  objectType2[objectType2["OTHER"] = 4] = "OTHER";
  return objectType2;
})(objectType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  objectType
});

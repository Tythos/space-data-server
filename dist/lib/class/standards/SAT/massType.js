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
var massType_exports = {};
__export(massType_exports, {
  massType: () => massType
});
module.exports = __toCommonJS(massType_exports);
var massType = /* @__PURE__ */ ((massType2) => {
  massType2[massType2["DRY"] = 0] = "DRY";
  massType2[massType2["WET"] = 1] = "WET";
  return massType2;
})(massType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  massType
});

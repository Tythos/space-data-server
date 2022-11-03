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
var maneuverableType_exports = {};
__export(maneuverableType_exports, {
  maneuverableType: () => maneuverableType
});
module.exports = __toCommonJS(maneuverableType_exports);
var maneuverableType = /* @__PURE__ */ ((maneuverableType2) => {
  maneuverableType2[maneuverableType2["YES"] = 0] = "YES";
  maneuverableType2[maneuverableType2["NO"] = 1] = "NO";
  maneuverableType2[maneuverableType2["NA"] = 2] = "NA";
  return maneuverableType2;
})(maneuverableType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  maneuverableType
});

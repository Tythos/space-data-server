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
var screeningVolumeShape_exports = {};
__export(screeningVolumeShape_exports, {
  screeningVolumeShape: () => screeningVolumeShape
});
module.exports = __toCommonJS(screeningVolumeShape_exports);
var screeningVolumeShape = /* @__PURE__ */ ((screeningVolumeShape2) => {
  screeningVolumeShape2[screeningVolumeShape2["ELLIPSOID"] = 0] = "ELLIPSOID";
  screeningVolumeShape2[screeningVolumeShape2["BOX"] = 1] = "BOX";
  return screeningVolumeShape2;
})(screeningVolumeShape || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  screeningVolumeShape
});

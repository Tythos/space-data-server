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
var objectCenteredReferenceFrame_exports = {};
__export(objectCenteredReferenceFrame_exports, {
  objectCenteredReferenceFrame: () => objectCenteredReferenceFrame
});
module.exports = __toCommonJS(objectCenteredReferenceFrame_exports);
var objectCenteredReferenceFrame = /* @__PURE__ */ ((objectCenteredReferenceFrame2) => {
  objectCenteredReferenceFrame2[objectCenteredReferenceFrame2["RTN"] = 0] = "RTN";
  objectCenteredReferenceFrame2[objectCenteredReferenceFrame2["TVN"] = 1] = "TVN";
  return objectCenteredReferenceFrame2;
})(objectCenteredReferenceFrame || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  objectCenteredReferenceFrame
});

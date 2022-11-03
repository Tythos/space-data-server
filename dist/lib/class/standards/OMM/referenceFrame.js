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
var referenceFrame_exports = {};
__export(referenceFrame_exports, {
  referenceFrame: () => referenceFrame
});
module.exports = __toCommonJS(referenceFrame_exports);
var referenceFrame = /* @__PURE__ */ ((referenceFrame2) => {
  referenceFrame2[referenceFrame2["EME2000"] = 0] = "EME2000";
  referenceFrame2[referenceFrame2["GCRF"] = 1] = "GCRF";
  referenceFrame2[referenceFrame2["GRC"] = 2] = "GRC";
  referenceFrame2[referenceFrame2["ICRF"] = 3] = "ICRF";
  referenceFrame2[referenceFrame2["ITRF2000"] = 4] = "ITRF2000";
  referenceFrame2[referenceFrame2["ITRF93"] = 5] = "ITRF93";
  referenceFrame2[referenceFrame2["ITRF97"] = 6] = "ITRF97";
  referenceFrame2[referenceFrame2["MCI"] = 7] = "MCI";
  referenceFrame2[referenceFrame2["TDR"] = 8] = "TDR";
  referenceFrame2[referenceFrame2["TEME"] = 9] = "TEME";
  referenceFrame2[referenceFrame2["TOD"] = 10] = "TOD";
  return referenceFrame2;
})(referenceFrame || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  referenceFrame
});

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
var dataStatusCode_exports = {};
__export(dataStatusCode_exports, {
  dataStatusCode: () => dataStatusCode
});
module.exports = __toCommonJS(dataStatusCode_exports);
var dataStatusCode = /* @__PURE__ */ ((dataStatusCode2) => {
  dataStatusCode2[dataStatusCode2["NO_CURRENT_ELEMENTS"] = 0] = "NO_CURRENT_ELEMENTS";
  dataStatusCode2[dataStatusCode2["NO_INITIAL_ELEMENTS"] = 1] = "NO_INITIAL_ELEMENTS";
  dataStatusCode2[dataStatusCode2["NO_ELEMENTS_AVAILABLE"] = 2] = "NO_ELEMENTS_AVAILABLE";
  dataStatusCode2[dataStatusCode2["OK"] = 3] = "OK";
  return dataStatusCode2;
})(dataStatusCode || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dataStatusCode
});

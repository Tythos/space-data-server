"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var standards_exports = {};
__export(standards_exports, {
  CAT: () => CAT,
  CDM: () => CDM,
  OEM: () => OEM,
  OMM: () => OMM,
  OPM: () => OPM
});
module.exports = __toCommonJS(standards_exports);
var CAT = __toESM(require("@/lib/class/standards/CAT/main"));
var OMM = __toESM(require("@/lib/class/standards/OMM/main"));
var CDM = __toESM(require("@/lib/class/standards/CDM/main"));
var OPM = __toESM(require("@/lib/class/standards/OPM/main"));
var OEM = __toESM(require("@/lib/class/standards/OEM/main"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CAT,
  CDM,
  OEM,
  OMM,
  OPM
});

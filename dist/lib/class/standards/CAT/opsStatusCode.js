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
var opsStatusCode_exports = {};
__export(opsStatusCode_exports, {
  opsStatusCode: () => opsStatusCode
});
module.exports = __toCommonJS(opsStatusCode_exports);
var opsStatusCode = /* @__PURE__ */ ((opsStatusCode2) => {
  opsStatusCode2[opsStatusCode2["OPERATIONAL"] = 0] = "OPERATIONAL";
  opsStatusCode2[opsStatusCode2["NONOPERATIONAL"] = 1] = "NONOPERATIONAL";
  opsStatusCode2[opsStatusCode2["PARTIALLY_OPERATIONAL"] = 2] = "PARTIALLY_OPERATIONAL";
  opsStatusCode2[opsStatusCode2["BACKUP_STANDBY"] = 3] = "BACKUP_STANDBY";
  opsStatusCode2[opsStatusCode2["SPARE"] = 4] = "SPARE";
  opsStatusCode2[opsStatusCode2["EXTENDED_MISSION"] = 5] = "EXTENDED_MISSION";
  opsStatusCode2[opsStatusCode2["DECAYED"] = 6] = "DECAYED";
  opsStatusCode2[opsStatusCode2["UNKNOWN"] = 7] = "UNKNOWN";
  return opsStatusCode2;
})(opsStatusCode || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  opsStatusCode
});

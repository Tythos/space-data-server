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
var worker_exports = {};
__export(worker_exports, {
  default: () => worker_default
});
module.exports = __toCommonJS(worker_exports);
var import_express = __toESM(require("express"));
var import_dotenv = __toESM(require("dotenv"));
var import_http = __toESM(require("http"));
var import_os = require("os");
var import_process2 = require("process");
var import_spacedata = __toESM(require("../routes/spacedata/spacedata.js"));
const totalCPUs = (0, import_os.cpus)().length;
let bingoProcess = 0;
var worker_default = {
  init: function() {
    import_dotenv.default.config();
    const app = (0, import_express.default)();
    const port = process.env.PORT || "3000";
    const server = import_http.default.createServer(app);
    app.get("/", (req, res) => {
      res.end(`<html>Express + TypeScript Server ${import_process2.pid}</html>`);
    });
    app.get("/spacedata/:standard?", import_spacedata.default);
    app.listen(port, () => {
      console.log(`\u26A1\uFE0F[child process ${import_process2.pid} server]: Server is running at https://localhost:${port}`);
    });
  },
  deinit: function() {
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

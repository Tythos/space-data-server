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
var primary_exports = {};
__export(primary_exports, {
  default: () => primary_default
});
module.exports = __toCommonJS(primary_exports);
var import_cluster = __toESM(require("cluster"));
var import_os = require("os");
var import_process2 = require("process");
const totalCPUs = (0, import_os.cpus)().length;
let bingoProcess = 0;
var primary_default = {
  init: function() {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${import_process2.pid} is running`);
    for (let i = 0; i < totalCPUs; i++) {
      let cWorker = import_cluster.default.fork();
      if (!bingoProcess) {
        bingoProcess = cWorker.process.pid;
        console.log(bingoProcess);
      }
    }
    import_cluster.default.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      while (Object.keys(
        import_cluster.default.workers
      ).length < totalCPUs) {
        let cWorker = import_cluster.default.fork();
        if (worker.process.pid === bingoProcess) {
          bingoProcess = cWorker.process.pid;
        }
        console.log(bingoProcess, Object.keys(import_cluster.default.workers), totalCPUs);
      }
    });
  },
  deinit: function() {
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

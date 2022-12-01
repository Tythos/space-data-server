/** @type {import('ts-jest').JestConfigWithTsJest} */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./test", "./lib"],
  modulePathIgnorePatterns: ["./test/output/data/"],
  extensionsToTreatAsEsm: [".ts"],
  resolver: "jest-ts-webcompat-resolver",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  }),
  
};

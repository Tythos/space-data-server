/** @type {import('ts-jest').JestConfigWithTsJest} */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./test", "./lib"],
  transform: { "\\.[jt]s?$": ["ts-jest", { tsconfig: { allowJs: true } }] }, // allowJs is required for get-port
  extensionsToTreatAsEsm: [".ts"],
  modulePathIgnorePatterns: ["./test/output/data/"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
    '^(\\.{1,2}/.*)\\.[jt]s$': '$1',

  }),
};

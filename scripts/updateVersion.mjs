import { readFileSync, writeFileSync } from "fs";
let packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

let newVersion = Date.now();
let pVersionParts = packageJson.version.split("+");
let pVersion = pVersionParts[0].split(".").map((n) => parseInt(n));
pVersion[pVersion.length - 1] = pVersion[pVersion.length - 1] + 1;

packageJson.version = `${pVersion.join(".")}+${newVersion}`;
writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));

let serverSrc = readFileSync("./build/server.cjs", "utf-8");
writeFileSync(
  "./build/server.cjs",
  serverSrc.replace("1ce866a2-3653-4d62-b1b2-440e8f82d3cd", packageJson.version)
);

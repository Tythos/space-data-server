import { readFileSync, writeFileSync } from "fs";
import packageJSON from "../package.json" assert { "type": "json" }
import packageJSONSDS from "../packages/spacedatastandards.org/package.json" assert { "type": "json" };
import { execSync } from "child_process";

let newVersion = Date.now();
let mVersion = `${packageJSONSDS.version.split("+")[0]}-${packageJSON.version.split(/[\-\+]/g)[2]}`;
packageJSON.version = `${mVersion}+${newVersion}`;

writeFileSync("./package.json", JSON.stringify(packageJSON, null, 4));

if (!~execSync("git tag").toString().split("\n").indexOf("v" + mVersion)) {
  console.log(execSync(`git tag -a v${mVersion} -m "${mVersion}"`).toString());
}

let serverSrc = readFileSync("./build/server.cjs", "utf-8");
writeFileSync(
  "./build/server.cjs",
  serverSrc.replace("1ce866a2-3653-4d62-b1b2-440e8f82d3cd", packageJSON.version)
);

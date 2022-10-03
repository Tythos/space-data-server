import flatc from "./flatc.mjs";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  rmdirSync,
  existsSync,
  readdirSync,
} from "fs";
import packageJSON from "../../package.json" assert { type: "json" };
let dataTypes = [["--jsonschema"], ["--ts", "--gen-object-api"]];

let standardsPath = "./packages/spacedatastandards.org";

export const en = { encoding: "utf8" };

const getCode = async (_idl, classFolder) => {
  flatc({
    noInitialRun: true,
  }).then((m) => {
    _idl = _idl.replace(/\s{0,}=\s{0,}null/g, "");
    m.FS.writeFile("/main.fbs", _idl);

    const runFile = (xx) => {
      let args = xx;
      if (!Array.isArray(xx)) {
        args = [xx];
      }
      args = [...args, "/main.fbs"];
      m.main(args);
      let files = m.FS.readdir("/").filter((a) => {
        return !~[".", "..", "tmp", "home", "dev", "proc", "main.fbs"].indexOf(
          a
        );
      });
      for (let f = 0; f < files.length; f++) {
        writeFileSync(
          `${classFolder}/${files[f]}`,
          m.FS.readFile(files[f], en)
        );
      }
    };
    runFile(dataTypes[0]);
    runFile(dataTypes[1]);
  });
};

let standardsPackage = JSON.parse(
  readFileSync(`${standardsPath}/package.json`, en)
);
console.log(
  `Generating SpaceDataStandards version: ${standardsPackage.version}
  `
);
let folders = readdirSync(`${standardsPath}/standards/`);
for (let f = 0; f < folders.length; f++) {
  console.log(`Generating: ${folders[f]}`);
  let folderName = folders[f];
  let _idl = readFileSync(
    `./packages/spacedatastandards.org/standards/${folderName}/main.fbs`,
    en
  );
  let classFolder = `${packageJSON.standardsPath}/${folderName}`;
  if (existsSync(classFolder)) {
    rmdirSync(classFolder, { recursive: true, force: true });
  }
  mkdirSync(classFolder);
  getCode(_idl, classFolder);
}

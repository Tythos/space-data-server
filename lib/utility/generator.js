import flatc from "./flatc.mjs";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  rmSync,
  existsSync,
  readdirSync,
} from "fs";
import packageJSON from "../../package.json" assert { type: "json" };
let dataTypes = [["--jsonschema"], ["--ts", "--gen-object-api"]];
const { standardsPath } = packageJSON;
export const en = { encoding: "utf8" };

const getCode = async (_idl, classFolder) => {
  return new Promise((resolve, reject) => {
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
          return !~[
            ".",
            "..",
            "tmp",
            "home",
            "dev",
            "proc",
            "main.fbs",
          ].indexOf(a);
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
      resolve();
    });
  });
};

let standardsPackage = JSON.parse(
  readFileSync(`./packages/spacedatastandards.org/package.json`, en)
);
console.log(
  `Generating SpaceDataStandards version: ${standardsPackage.version}
  `
);
let folders = readdirSync(`./packages/spacedatastandards.org/standards/`);
let generatePromises = [];
for (let f = 0; f < folders.length; f++) {
  console.log(`Generating: ${folders[f]}`);
  let folderName = folders[f];
  let _idl = readFileSync(
    `./packages/spacedatastandards.org/standards/${folderName}/main.fbs`,
    en
  );
  let classFolder = `${standardsPath}/${folderName.match(/\((.*)\)/)[1]}`;
  if (existsSync(classFolder)) {
    rmSync(classFolder, { recursive: true, force: true });
  }
  mkdirSync(classFolder);
  generatePromises.push(getCode(_idl, classFolder));
}

Promise.all(generatePromises).then(() => {
  let _src = ``;
  for (let f = 0; f < folders.length; f++) {
    let folderName = folders[f].match(/\((.*)\)/)[1];
    let mainSchema = JSON.parse(
      readFileSync(
        `${packageJSON.standardsPath}/${folderName}/main.schema.json`,
        en
      )
    );

    let mainExport = mainSchema.$ref.split("/").pop();

    let exportArray = [
      mainExport,
      `${mainExport}T`,
      `${mainExport}COLLECTION`,
      `${mainExport}COLLECTIONT`,
    ];

    _src += `export { ${exportArray.join(
      ","
    )} } from "${packageJSON.standardsPath.replace(
      "./",
      "@/"
    )}/${folderName}/main";\n`;
  }
  console.log(_src);
  writeFileSync("./lib/routes/spacedata/standards.ts", _src);
});

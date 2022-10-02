import flatc from "./flatc.mjs";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";

let dataTypes = [
    ["--jsonschema"],
    ["--ts", "--gen-object-api"]
];

export const en = { encoding: "utf8" };

const getCode = async (_idl, classFolder) => {
    flatc({
        noInitialRun: true,
    }).then((m) => {
        console.log(classFolder)

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
                writeFileSync(`${classFolder}/${files[f]}`, m.FS.readFile(files[f], en));
            }
        };
        runFile(dataTypes[0]);
        runFile(dataTypes[1]);
    });
};

let folders = readdirSync("./packages/spacedatastandards.org/standards/");
for (let f = 0; f < folders.length; f++) {
    console.log(folders[f]);
    let folderName = folders[f];
    let _idl = readFileSync(`./packages/spacedatastandards.org/standards/${folderName}/main.fbs`, en);
    let classFolder = `./lib/class/${folderName}`;
    if (!existsSync(classFolder)) {
        mkdirSync(classFolder);
    }
    getCode(_idl, classFolder);
}





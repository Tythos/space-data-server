import { readFile, writeFile } from "fs/promises";
let uiBuild = (await readFile("./UI/dist/index.html")).toString("base64");
let uiExportsFile = `export const ui = "${uiBuild}";`;
await writeFile("./lib/ui/index.ts", uiExportsFile);


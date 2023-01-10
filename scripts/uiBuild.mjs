import { readFile, writeFile } from "fs/promises";
import inliner from "inliner";
import { writeFileSync } from "fs";
new inliner("./node_modules/swagger-ui-dist/index.html", async function (error, inlinedSwaggerHTML) {
    inlinedSwaggerHTML = inlinedSwaggerHTML.replaceAll("https://petstore.swagger.io/v2/swagger.json", "./swagger-json");
    let uiSwaggerB64 = Buffer.from(inlinedSwaggerHTML).toString("base64");
    let uiBuild = (await readFile("./UI/dist/index.html")).toString("base64");

    let uiExportsFile = `export const ui = "${uiBuild}";
export const swaggerUI = "${uiSwaggerB64}"`;

    await writeFile("./lib/ui/index.ts", uiExportsFile);
})


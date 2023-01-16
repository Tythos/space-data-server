import sA from 'swagger-autogen';
import packageJSON from "../package.json" assert {type: "json"};
import { readFileSync, writeFileSync } from 'fs';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import standardsJSON from "../lib/standards/schemas.json" assert {type: "json"};

import { join } from "path";
import { assert } from 'console';

const swaggerAutogen = sA({ openapi: '3.0.0' });

const responseTypes = ['application/json', 'application/octet-stream'];

const doc = {
    info: {
        version: packageJSON.version,
        title: "Space Data Server",
        description: `MVP Space Data Service based on the data standards at: <a href="https://SpaceDataStandards.org">SpaceDataStandards.org</a>, version ${packageJSON.standardsVersion}`
    },
    host: "",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: responseTypes,
    produces: responseTypes,
    "paths": {
        "/": {
            "get": {
                "description": "Home",
                "parameters": [],
                "responses": {}
            }
        }
    }
}

const outputFile = '../swagger-output.json'
const endpointsFiles = ['../lib/worker/app']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const _path = (join(__dirname, outputFile));
    let swaggerJSON = JSON.parse(readFileSync(_path, "utf8"));
    swaggerJSON.definitions = standardsJSON;
    writeFileSync(_path, JSON.stringify(swaggerJSON, null, 4));
    console.log(swaggerJSON);
})
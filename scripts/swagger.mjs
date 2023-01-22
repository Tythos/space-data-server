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
        },
        "/spacedatalatest/{standard}/{provider}": {
            "get": {
                "description": "",
                "parameters": [
                    {
                        "name": "standard",
                        "description": "Three Letter Identifier for <a href='SpaceDataStandards.org'>SpaceDataStandards.org</a> standard.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "$ref": "#/definitions/STANDARDS"
                        }
                    },
                    {
                        "name": "provider",
                        "description": "The globally unique identifier (GUID) for a data provider.",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {},
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": ""
                            }
                        },
                        "application/octet-stream": {
                            "schema": {
                                "$ref": ""
                            }
                        }
                    }
                }
            }
        },
        "/sql/": {
            "get": {
                "description": "SQL used to generate the database structure for this server.",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "Successfully returns the raw SQL as a string.",
                        "content": {
                            "application/text": {
                                "schema": {
                                    "type": "string"
                                }
                            }
                        }

                    }
                }
            }
        }
    }
}

const outputFile = '../swagger-output.json';
const endpointsFiles = ['../lib/worker/app'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    const _path = (join(__dirname, outputFile));
    let swaggerJSON = JSON.parse(readFileSync(_path, "utf8"));
    swaggerJSON.definitions = standardsJSON;
    swaggerJSON.definitions.STANDARDS = {
        "type": "string",
        "description": "List of SpaceDataStandards.org Standards Loaded into this node.",
        "enum": Object.keys(standardsJSON)
    };
    delete swaggerJSON.info;
    swaggerJSON = Object.assign({}, doc, swaggerJSON);
    swaggerJSON.paths = Object.assign({}, swaggerJSON.paths, doc.paths);
    writeFileSync(_path, JSON.stringify(swaggerJSON, null, 4));
})
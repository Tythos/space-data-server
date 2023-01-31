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
        "/cid/{provider}/{standard}": {
            "get": {
                "description": "Returns the latest Content Identifier for a provider by standard. If the query parameters `start` and `stop` are omitted, it will returnt the latest CID.",
                "parameters": [
                    {
                        "name": "provider",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "standard",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "$ref": "#/definitions/STANDARDS"
                        }
                    },
                    {
                        "in": "query",
                        "name": "start",
                        "description": "Start date",
                        "schema": {
                            "type": "string",
                            "format": "date"
                        },
                        "required": true
                    },
                    {
                        "in": "query",
                        "name": "stop",
                        "description": "Stop date",
                        "schema": {
                            "type": "string",
                            "format": "date"
                        },
                        "required": true
                    }
                ],
                "responses": {}
            }
        },
        "/providers/{provider?}": {
            "get": {
                "description": "Returns a list of all of the providers available on the node.",
                "parameters": [
                    {
                        "name": "provider?",
                        "in": "path",
                        "required": false,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/spacedata/{provider}/{standard}/{cid?}": {
            "get": {
                "description": "Returns data by standard, provider, and optionally the Content Identifier (CID).  The CID is created using a Flatbuffer of the returned data, regardless of the serialization selected.  If no CID is specified, the most recent CID is used.  The CID is always returned in the header \"x-content-identifier\".",
                "parameters": [
                    {
                        "name": "provider",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "standard",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "$ref": "#/definitions/STANDARDS"
                        }
                    },

                    {
                        "name": "cid?",
                        "in": "path",
                        "required": false,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "JSON Schema of standards.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object"
                                }
                            },
                            "application/octet-stream": {
                                "schema": {
                                    "type": "Buffer"
                                }
                            }
                        }

                    }
                }
            }
        },
        "/spacedata/{standard}": {
            "post": {
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
                        "name": "Authorization",
                        "in": "header",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "pattern": "^Bearer\\s[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$"
                        },
                        "description": "JSON Web Signature Token in the format of 'Bearer {token}'"
                    }
                ],
                "requestBody": {
                    "required": true,
                    "in": "body",
                    "content": {
                        "application/octet-stream": {
                            "schema": {
                                "type": "string",
                                "format": "binary"
                            }
                        }
                    }
                },
                "responses": {}
            }
        },
        "/standards/{standard?}": {
            "get": {
                "description": "Returns the JSON Schema document for a SpaceDataStandards.org standard.  Defaults to sending back all standards.",
                "parameters": [
                    {
                        "name": "standard?",
                        "description": "Three Letter Identifier for <a href='SpaceDataStandards.org'>SpaceDataStandards.org</a> standard.",
                        "in": "path",
                        "required": false,
                        "schema": {
                            "type": "string",
                            "$ref": "#/definitions/STANDARDS"
                        }
                    },
                ],
                "responses": {
                    "200": {
                        "description": "JSON Schema of standards.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object"
                                }
                            }
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
};


const outputFile = '../swagger-output.json';
const endpointsFiles = ['../lib/worker/app'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    const _path = (join(__dirname, outputFile));
    let swaggerJSON = JSON.parse(readFileSync(_path, "utf8"));
    swaggerJSON.definitions = standardsJSON;
    swaggerJSON.definitions.STANDARDS = {
        "type": "string",
        "description": "List of SpaceDataStandards.org Standards Loaded into this node.",
        "enum": ["", ...Object.keys(standardsJSON)]
    };
    delete swaggerJSON.info;
    swaggerJSON = Object.assign({}, doc, swaggerJSON);
    swaggerJSON.paths = Object.assign({}, swaggerJSON.paths, doc.paths);
    writeFileSync(_path, JSON.stringify(swaggerJSON, null, 4));
})
import sA from 'swagger-autogen';
import packageJSON from "../package.json" assert {type: "json"};

const swaggerAutogen = sA();

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

})
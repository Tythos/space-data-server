import { generateDatabase } from "@/lib/database/generateTables";
import defaultDatabaseConfig from "@/lib/database/config/config.json";
import { connection } from "@/lib/database/connection";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { JSONSchema4 } from "json-schema";
import standardsJSON from "@/lib/standards/schemas.json";
import * as express from "express";

if(!existsSync(""))

let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON) as unknown as Array<JSONSchema4>;

export const writeConfigFile: express.RequestHandler = async (req, res, next) => {

}

export const writeToDatabase: express.RequestHandler = async (req, res, next) => {
    readFileSync("")
    if (!existsSync(databaseConfig.connection.filename)) {
        await generateDatabase(standardsArray, databaseConfig.connection.filename, `./.database/standards.${databaseConfig.version}.sql`, connection);
    }
};
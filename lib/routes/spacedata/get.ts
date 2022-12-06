import { Request, Response } from "express";
import * as express from "express";
import * as standards from "@/lib/standards/standards";
import { readFileSync } from "fs";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import read from "@/lib/database/read";
import { writeFB } from "@/lib/utility/flatbufferConversion";
import { connection } from "@/lib/database/connection";

export const get: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
  if (!req.params.standard) {
    res.send(Object.keys(standards));
  } else {
    const standard = req.params.standard.toUpperCase();
    let { query, format, schema } = req.query;
    if (schema) {
      res.end(JSON.stringify(standardsJSON[standard], null, 4));
    } else {

      try {
        query = JSON.parse(query as string);
      } catch (e) {
        console.log(e);
        res.status(500);
        res.end();
      }

      let payload = await read(connection, standard, standardsJSON[standard], (query as Array<any>));
      if (format === "json") {
        payload = JSON.stringify(payload);
      } else {
        payload = writeFB(payload);
      }
      res.end(payload);
    }
  }

  next();
};
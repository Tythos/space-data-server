import { Request, Response } from "express";
import * as express from "express";
import * as standards from "@/lib/standards/standards";
import standardsJSON from "@/lib/standards/schemas.json";
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
      //@ts-ignore
      res.end(JSON.stringify(standardsJSON[standard], null, 4));
    } else {

      try {
        if (query) {
          query = JSON.parse(query as string);
        }
      } catch (e) {
        console.log(e);
        res.status(500);
        res.end();
      }
      let payload;
      if (req.params.querytype === "latest") {

        let { CID } = await connection("FILE_IMPORT_TABLE").select("CID").orderBy("updated_at").first();

        //@ts-ignore
        payload = await read(connection, standard, standardsJSON[standard], [
          ["select", ["*"]],
          ["where", ["file_id", "=", CID]]]);
      } else {
        //@ts-ignore
        payload = await read(connection, standard, standardsJSON[standard], (query as Array<any>));
      }
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
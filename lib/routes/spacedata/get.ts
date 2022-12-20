import { Request, Response } from "express";
import * as express from "express";
import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import read from "@/lib/database/read";
import { writeFB } from "@/lib/utility/flatbufferConversion";
import { connection } from "@/lib/database/connection";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";

const standardsJSON: KeyValueDataStructure = _standardsJSON;

export const get: express.RequestHandler = async (req: Request, res: Response, next: Function) => {

  if (req.params?.querytype?.split(".").pop() === 'map') {
    res.end();
    next();
  } else {
    if (!standards.hasOwnProperty(req.params?.standard)) {
      res.send(Object.keys(standards));
    } else {
      const standard = req.params.standard.toUpperCase();
      let { query, format, schema } = req.query;
      if (schema) {
        res.end(JSON.stringify(standardsJSON[standard], null, 4));
      } else {
        let parsedQuery: Array<any> = [];
        try {
          if (query) {
            parsedQuery = JSON.parse(query as string) as Array<any>;
          }
        } catch (e) {
          console.log(e);
          res.status(500);
          res.end();
        }
        let payload;
        if (req.params.querytype === "latest") {

          let latestCID = await connection("FILE_IMPORT_TABLE").select("CID").orderBy("updated_at").first();
          if (latestCID) {
            let { CID } = latestCID;
            parsedQuery.push(["where", ["file_id", "=", CID]]);
          }
        }

        payload = await read(connection, standard, standardsJSON[standard], (parsedQuery as Array<any>));

        if (format === "json") {
          payload = JSON.stringify(payload);
        } else {
          payload = writeFB(payload);
        }
        res.end(payload);
      }
    }

    next();
  }
};
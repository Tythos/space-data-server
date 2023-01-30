import { Request, Response } from "express";
import * as express from "express";
import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import read from "@/lib/database/read";
import { connection } from "@/lib/database/connection";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { formatResponse } from "./responseFormat";

const standardsJSON: KeyValueDataStructure = _standardsJSON;

export const get: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
  let { standard, provider, cid } = req.params;
  standard = standard.toUpperCase();
  if (!provider) {
    res.status(500);
    res.end("ERROR: No Provider Selected.")
  }

  //@ts-ignore
  if (!standards[standard]) {

    res.send(Object.keys(standards));

  } else {

    standard = standard.toUpperCase();
    let { query } = req.query;
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

    let currentCID = await connection("FILE_IMPORT_TABLE").orderBy("CID").first();
    
    console.log(currentCID);

    let payload = await read(connection, standard, standardsJSON[standard], (parsedQuery as Array<any>));
    payload = formatResponse(req, res, payload);

    res.end(payload);

  }

  next();
};
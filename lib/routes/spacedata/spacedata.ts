import { Request, Response } from "express";
import packageJSON from "@/package.json";
import * as standards from "@/lib/standards/standards";
import * as flatbuffers from "flatbuffers";
import { Parser } from "json2csv";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { readFileSync } from "fs";
const sqlfilename = "./test/output/standards.sql";
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import read from "@/lib/database/read";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion";

//.sig file, reference file for input in database, optional encryption file


export default async (req: Request, res: Response, next: Function) => {
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
        console.log(e)
      }

      let payload = await read(standard, standardsJSON[standard], query);
      if (format === "json") {
        payload = JSON.stringify(payload);
      } else {
        payload = writeFB(payload)
      }
      res.end(payload);
    }
  }

  next();
};
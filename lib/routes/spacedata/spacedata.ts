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

//.sig file, reference file for input in database, optional encryption file


export default (req: Request, res: Response, next: Function) => {
  if (!req.params.standard) {
    res.send(Object.keys(standards));
  } else {
    const standard = req.params.standard.toUpperCase();
    const allStandards: KeyValueDataStructure = standards;
    const predicate: string = standard + "T";

    const currentStandard = allStandards[standard]; //, allStandards, predicate);

    console.log(read(standard, standardsJSON));

    res.end();
  }

  next();
};
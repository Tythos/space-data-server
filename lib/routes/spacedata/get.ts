import { Request, Response } from "express";
import * as express from "express";
import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import read from "@/lib/database/read";
import { connection } from "@/lib/database/connection";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { formatResponse } from "./responseFormat";
import { config } from "@/lib/config/config";
import { createReadStream, readFileSync, statSync } from "fs";
import { join, resolve } from "path";

const standardsJSON: KeyValueDataStructure = _standardsJSON;
const cFP = config?.data?.fileSystemPath;
const fileReadPath = cFP && cFP[0] === "/" ?
  cFP : resolve(process.cwd(), cFP);
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

    let currentCID: string = cid;
    let currentDigitalSignature: string = "";
    if (!currentCID) {
      let { CID, DIGITAL_SIGNATURE } = await connection("FILE_IMPORT_TABLE")
        .orderBy("created_at", "desc").first().catch((e: any) => {
          res.end({ error: e });
        });
      currentCID = CID;
      currentDigitalSignature = DIGITAL_SIGNATURE;
    } else {
      let { CID, DIGITAL_SIGNATURE } = await connection("FILE_IMPORT_TABLE").where({ CID: currentCID }).first().catch((e: any) => {
        res.end({ error: e });
      });
      currentDigitalSignature = DIGITAL_SIGNATURE;
    }
    res.set("x-digital-signature", currentDigitalSignature);
    if (config.data.useFileSystem) {
      const filePath = join(fileReadPath, standard, provider, `${currentCID}.fbs`);
      res.setHeader("Content-Type", "application/octet-stream");
      res.sendFile(filePath);
    } else {
      if (!parsedQuery.length) {
        parsedQuery = [["where", ["file_id", "=", currentCID]]];
      }
      let payload = await read(connection, standard, standardsJSON[standard], (parsedQuery as Array<any>));
      payload = formatResponse(req, res, payload);
      res.set("x-content-identifier", currentCID);
      res.end(payload);
    }
  }
};
import { Request, Response } from "express";
import * as express from "express";
import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import read from "@/lib/database/read";
import { connection } from "@/lib/database/connection";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { config } from "@/lib/config/config";
import { join, resolve } from "path";
import { createReadStream, existsSync, readFileSync } from "fs";
import { refRootName } from "@/lib/database/generateTables";
import { getFileName, readFB, writeFB } from '@/lib/utility/flatbufferConversion';
import { resetIndex } from "apicache";

const standardsJSON: KeyValueDataStructure = _standardsJSON;
const cFP = config?.data?.fileSystemPath;
const fileReadPath = cFP && cFP[0] === "/" ?
  cFP : resolve(process.cwd(), cFP);
export const get: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
  let { standard, provider, cid } = req.params;

  standard = standard?.toUpperCase();
  provider = provider?.toLowerCase();

  if (!provider) {
    res.status(500);
    res.end("ERROR: No Provider Selected.")
  }
  //@ts-ignore
  if (!standards[standard]) {

    res.send(Object.keys(standards));

  } else {

    let { query } = req.query;
    let parsedQuery: Array<any> = [];

    try {
      if (query) {
        parsedQuery = JSON.parse(query as string) as Array<any>;
      }
    } catch (e) {
      res.status(500);
      res.end();
    }

    let currentCID: string = cid;
    let currentDigitalSignature: string = "";

    if (!currentCID) {
      let currentCIDRecord = await connection("FILE_IMPORT_TABLE").where({ PROVIDER: provider, STANDARD: standard })
        .orderBy("created_at", "desc").first().catch((e: any) => {
          res.end({ error: e });
        });
      if (!currentCIDRecord) {
        res.status(404);
        res.end();
        return;
      }
      let { CID, DIGITAL_SIGNATURE } = currentCIDRecord;
      currentCID = CID;
      currentDigitalSignature = DIGITAL_SIGNATURE;
    } else {

      let record = await connection("FILE_IMPORT_TABLE").where({ CID: currentCID }).first().catch((e: any) => {
        res.json({ error: e });
        res.status(500);
        res.end();
      });

      if (!record?.CID) {
        res.status(404);
        res.end();
        return;
      } else {
        let { DIGITAL_SIGNATURE } = record;
        currentDigitalSignature = DIGITAL_SIGNATURE;
      }
    }

    if (!currentDigitalSignature) {
      res.status(404);
      res.end();
      return;
    }

    res.set("x-digital-signature", currentDigitalSignature);

    if (!parsedQuery.length) {
      parsedQuery = [["where", ["file_id", "=", currentCID]]];
    }
    let payload;

    res.set("x-content-identifier", currentCID);

    const useJSON = (req.query?.format as string)?.toUpperCase() !== "FBS" && req.accepts("application/json");
    
    if (config.data.useDatabase) {
      payload = await read(connection, standard, standardsJSON[standard], (parsedQuery as Array<any>));

      if (payload.RECORDS.length === 0) {
        res.status(404);
        res.end();
        return;
      }

      if (useJSON) {

        res.json(payload);
        res.end();

      } else {

        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(writeFB(payload));

      }

    } else {

      let fileToStream = join(fileReadPath, standard, provider, getFileName(standard, currentCID));

      if (existsSync(fileToStream)) {

        if (useJSON) {
          res.json(readFB(readFileSync(fileToStream), standard, standards[standard]));
          res.end();
        } else {
          res.setHeader('Content-Type', 'application/octet-stream');
          let fpipe = createReadStream(fileToStream);
          fpipe.pipe(res);
          fpipe.on('error', err => {
            console.log(err);
            next(err);
          });
        }

      } else {
        res.status(404);
        res.end();
      }
    }
  }
};
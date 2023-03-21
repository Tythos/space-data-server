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
import { readFB, writeFB } from '@/lib/utility/flatbufferConversion';
import { resetIndex } from "apicache";

const standardsJSON: KeyValueDataStructure = _standardsJSON;
const cFP = config?.data?.fileSystemPath;
const fileReadPath = cFP && cFP[0] === "/" ?
  cFP : resolve(process.cwd(), cFP);
export const get: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
  let { standard, provider, cid } = req.params;

  standard = standard.toUpperCase();
  provider = provider.toLowerCase();

  if (!provider) {
    res.status(500);
    res.end("ERROR: No Provider Selected.")
  }
  //@ts-ignore
  if (!standards[standard]) {

    res.send(Object.keys(standards));

  } else {

    standard = standard?.toUpperCase();
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

      if (!record) {
        res.status(404);
        res.end();
        return;
      } else {
        let { DIGITAL_SIGNATURE } = record;
        currentDigitalSignature = DIGITAL_SIGNATURE;
      }
    }

    if (!currentDigitalSignature) {

      return;

    }

    res.set("x-digital-signature", currentDigitalSignature);

    let currentStandard = standardsJSON[standard];
    let tableName = refRootName(currentStandard.$ref);

    if (!parsedQuery.length) {
      parsedQuery = [["where", ["file_id", "=", currentCID]]];
    }
    let payload;
    res.set("x-content-identifier", currentCID);
    console.log(config.data)
    if (config.data.useDatabase) {
      console.log(standard);
      payload = await read(connection, standard, standardsJSON[standard], (parsedQuery as Array<any>));

      if (payload.RECORDS.length === 0) {
        res.status(404);
        res.end();
        return;
      }

      if (req.accepts("application/octet-stream")) {

        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(writeFB(payload));

      } else {

        res.json(payload);

        res.end();

      }

    } else {

      let fileToStream = join(fileReadPath, standard, provider, `${currentCID}.fbs`);

      if (existsSync(fileToStream)) {
        if (req.accepts("application/octet-stream")) {
          res.setHeader('Content-Type', 'application/octet-stream');
          let fpipe = createReadStream(fileToStream);
          fpipe.pipe(res);
          fpipe.on('error', err => {
            console.log(err);
            next(err);
          });
        } else {
          res.json(readFB(readFileSync(fileToStream), standard, standards[standard]));
          res.end();
        }
      } else {
        res.status(404);
        res.end();
      }
    }
  }
};
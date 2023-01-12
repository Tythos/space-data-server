
import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { createReadStream } from "fs";
import { config } from "@/lib/config/config";
import { join, resolve } from "path";
import { connection } from "@/lib/database/connection";
import read from "@/lib/database/read";
import { writeFB } from "@/lib/utility/flatbufferConversion";
import { formatResponse } from "./responseFormat";

const standardsJSON: KeyValueDataStructure = _standardsJSON;

export const latestStatic = async (req: any, res: any, next: any) => {
  let { standard, provider } = req.params;
  let { format = "json" } = req.query;
  format = format.toLowerCase();
  standard = standard.toUpperCase();
  //@ts-ignore
  if (!standards[standard]) {
    res.status(500);
    res.end("ERROR: No Standard Selected.");
  } else if (!provider) {
    res.status(500);
    res.end("ERROR: No Provider Selected.")
  } else if (!~["json", "fbs"].indexOf(format)) {
    res.status(500);
    res.end("ERROR: Invalid Format.");
  } else {
    const filePath = resolve(join(config.data.public, standard, provider, `latest.${format}`));
    res.setHeader('Content-Type', `application/${format === "json" ? "json" : "octet-stream"}`);

    const fileStream = createReadStream(
      filePath
    );
    fileStream.on('open', () => {
      fileStream.pipe(res);
    });
    fileStream.on('error', err => {
      next(err);
    });
  }
};

export const latest = async (req: any, res: any, next: any) => {
  let { standard, provider } = req.params;
  let { format = "json" } = req.query;
  standard = standard.toUpperCase();
  const fIT = await connection("FILE_IMPORT_TABLE").select("*").where({
    "PROVIDER": provider,
    "STANDARD": standard
  }).orderBy("created_at").first();
  if (fIT) {
    let { CID: latestCID } = fIT;
    let payload = await read(
      connection,
      standard,
      standardsJSON[standard],
      [["where", ["file_id", "=", latestCID]]]
    );
    payload = formatResponse(req, res, payload);
    /*
  if (format === "json") {
    payload = JSON.stringify(payload);
  } else {
    payload = writeFB(payload);
  }*/
    res.end(payload);
  } else {
    res.json([]);
  }
};
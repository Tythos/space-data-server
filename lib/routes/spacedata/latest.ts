
import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { createReadStream } from "fs";
import { config } from "@/lib/config/config";
import { join, resolve } from "path";

const standardsJSON: KeyValueDataStructure = _standardsJSON;

export const latest = async (req: any, res: any, next: any) => {
  let { standard, provider } = req.params;
  let { format = "fbs" } = req.query;
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
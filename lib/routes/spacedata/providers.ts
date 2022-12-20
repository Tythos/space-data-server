import { Request, Response } from "express";
import * as express from "express";
import * as standards from "@/lib/standards/standards";
import _standardsJSON from "@/lib/standards/schemas.json";
import read from "@/lib/database/read";
import { writeFB } from "@/lib/utility/flatbufferConversion";
import { connection } from "@/lib/database/connection";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";

const standardsJSON: KeyValueDataStructure = _standardsJSON;

export const providers: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
  if (req.params?.provider) {
    res.json(await connection("FILE_IMPORT_TABLE").where({ "ETH_ADDRESS": req.params.provider }));
  } else {
    const providers = await connection("FILE_IMPORT_TABLE").distinct("ETH_ADDRESS").pluck("ETH_ADDRESS");
    res.json(providers);
  }
  next();
};
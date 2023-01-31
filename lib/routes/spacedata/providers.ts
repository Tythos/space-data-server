import { Request, Response } from "express";
import * as express from "express";
import _standardsJSON from "@/lib/standards/schemas.json";
import { connection } from "@/lib/database/connection";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";

const standardsJSON: KeyValueDataStructure = _standardsJSON;

export const providers: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
  const providers = await connection("FILE_IMPORT_TABLE").distinct("PROVIDER").pluck("PROVIDER");
  res.json(providers);
  next();
};

export const provider: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
  const providers = await connection("DPM").select(req.params?.provider ? { GUID: req.params?.provider } : "*");
  res.json(providers);
  next();
};

export const cid: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
  const { provider, standard } = req.params;
  const cids = await connection("FILE_IMPORT_TABLE")
    .whereRaw("LOWER(PROVIDER) = LOWER(?)", [provider])
    .andWhereRaw("LOWER(STANDARD) = LOWER(?)", [standard])
    .orderBy("created_at", "desc").limit(1);
  res.json(cids);
  next();
}
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
    .orderBy("created_at", "desc").limit(1);//.toString();
  res.json(cids);
  next();
}

/*
0x9858effd232b4033e47d90003d41ec34ecaeda94
0x9858EfFD232B4033E47d90003D41EC34EcaEda94
    select * from `FILE_IMPORT_TABLE` where `PROVIDER` = '0X9858EFFD232B4033E47D90003D41EC34ECAEDA94' and `STANDARD` = 'OMM' order by `created_at` desc limit 1
*/
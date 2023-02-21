
import _standardsJSON from "@/lib/standards/schemas.json";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { connection } from "@/lib/database/connection";
import read from "@/lib/database/read";
import { formatResponse } from "./responseFormat";

const standardsJSON: KeyValueDataStructure = _standardsJSON;

export const latest = async (req: any, res: any, next: any) => {
  let { standard, provider } = req.params;
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

    res.end(payload);
  } else {
    res.json([]);
  }
};
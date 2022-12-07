import { config } from "@/lib/config/config";
import knex from "knex";

const connection: any = knex(config.database.config[config.database.config.primary]);

export { connection };
import { config } from "@/lib/config/config";
import knex from "knex";

const connection: any = knex((config.database.config as any)[config.database.config.primary as any]);

export { connection };
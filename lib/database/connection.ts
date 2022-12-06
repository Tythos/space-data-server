import databaseConfig from "@/lib/database/config/config.json";
import knex from "knex";

const connection: any = knex(databaseConfig);

export { connection };
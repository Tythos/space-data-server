import { config } from "@/lib/config/config";
import knex from "knex";

let connection: any;
try {
    connection = knex((config.database.config as any)[config.database.config.primary as any]);
} catch (e) {
    console.error(e);
    process.exit();
}

export { connection };
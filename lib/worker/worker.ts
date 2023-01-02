import { InitableProcess } from "../class/process.interface";
import { app } from "./app";
import { pid } from "process";
import { config } from "@/lib/config/config";
import { init as ingestInit, deinit as ingestDeinit } from "@/lib/ingest/index";
import { join } from "path";
const port: String | undefined = process.env.PORT || config.server.port.toString() || "3000";

import dotenv from "dotenv";

export default {
    init: async function () {
        dotenv.config();

        if (process.env.BINGO === "true") {
            try {
                await ingestInit(config.data.ingest);
                console.log(`${new Date().toISOString()},PID:${process.pid},Ingest service started in folder ${join(process.cwd(), config.data.ingest)}`)
            } catch (e) {
                console.log(e);
            }
        } else {
            app.listen(port, () => {
                console.log(`⚡️[child process ${pid} server]: Server is running at https://localhost:${port}`);
            });
        }
    },
    deinit: async function () {
        await ingestDeinit();
    }
} as InitableProcess;
import { InitableProcess } from "../class/process.interface";
import express, { Express, Request, Response } from 'express';
import http, { Server } from "http"; import { cpus } from "os";
import { pid } from "process";
import spacedata from "../routes/spacedata/spacedata.js";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
const totalCPUs = cpus().length;
let bingoProcess: Number = 0;

export default {
    init: function () {
        dotenv.config();
        const app: Express = express();
        const port: String | undefined = process.env.PORT || "3000";

        app.get("/", (req: Request, res: Response) => {
            res.end(`<html>DigitalArsenal.io Space Data Server Version: 1ce866a2-3653-4d62-b1b2-440e8f82d3cd</html>`);
        });
        app.get("/spacedata/:standard?", spacedata);
        app.listen(port, () => {
            console.log(`⚡️[child process ${pid} server]: Server is running at https://localhost:${port}`);
        });
    },
    deinit: function () {

    }
} as InitableProcess;
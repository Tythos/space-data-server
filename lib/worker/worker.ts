import { InitableProcess } from "../class/process.interface";
import express, { Express, Request, Response } from 'express';
import http, { Server } from "http";
import { cpus, totalmem, freemem } from "os";
import { pid, version } from "process";
import spacedata from "../routes/spacedata/spacedata.js";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import * as standards from "@/lib/standards/standards";
const totalCPUs = cpus().length;
let bingoProcess: Number = 0;

export default {
    init: function () {
        dotenv.config();
        const app: Express = express();
        const port: String | undefined = process.env.PORT || "3000";

        app.get("/", (req: Request, res: Response) => {
            res.end(`<html>
            <h2>DigitalArsenal.io Space Data Server Version: 1.0.0+1668633361148 </h2>
            <h2>Total CPU:${totalCPUs}</h2>
            <h2>Total Memory:${totalmem()}</h2>
            <h2>Free Memory:${freemem()}</h2>
            <h2>Node Version: ${version}</h2>
            <hr/>
            <h3><a href="./spacedata">spacedata</a></h3>
            <h3>API: spacedata/[${Object.keys(standards)}]/query=[["select":["*"]]]&format=[json, flatbuffer]
                  
            </html>`);
        });
        app.get("/spacedata/:standard?", spacedata);
        app.listen(port, () => {
            console.log(`⚡️[child process ${pid} server]: Server is running at https://localhost:${port}`);
        });
    },
    deinit: function () {

    }
} as InitableProcess;
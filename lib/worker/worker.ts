import { InitableProcess } from "../class/process.interface";
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http, { Server } from "http"; import { cpus } from "os";
import { pid } from "process";
const totalCPUs = cpus().length;

let bingoProcess: Number = 0;

export default {
    init: function () {
        dotenv.config();
        const app: Express = express();
        const port: String | undefined = process.env.PORT;
        const server: Server = http.createServer(app);

        app.get('/', (req: Request, res: Response) => {
            console.log(new Date(), pid, bingoProcess);
            res.end(`<html>Express + TypeScript Server ${pid}<script>window.location = window.location</script></html>`);
            setTimeout(() => {
                process.exit(0);
            }, 100);
        });

        app.listen(port, () => {
            console.log(`⚡️[child process ${pid} server]: Server is running at https://localhost:${port}`);
        });

    },
    deinit: function () {

    }
} as InitableProcess
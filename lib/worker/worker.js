import express from 'express';
import dotenv from 'dotenv';
import http from "http";
import { cpus } from "os";
import { pid } from "process";
const totalCPUs = cpus().length;
let bingoProcess = 0;
export default {
    init: function () {
        dotenv.config();
        const app = express();
        const port = process.env.PORT;
        const server = http.createServer(app);
        app.get('/', (req, res) => {
            console.log(new Date(), pid, bingoProcess);
            res.end(`<html>Express + TypeScript Server ${pid}</html>`);
            process.exit(0);
        });
        app.listen(port, () => {
            console.log(`⚡️[child process ${pid} server]: Server is running at https://localhost:${port}`);
        });
    },
    deinit: function () {
    }
};

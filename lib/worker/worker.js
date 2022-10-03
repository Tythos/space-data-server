import express from 'express';
import dotenv from 'dotenv';
import http from "http";
import { cpus } from "os";
import { pid } from "process";
import spacedata from "../routes/spacedata.js";
const totalCPUs = cpus().length;
let bingoProcess = 0;
export default {
    init: function () {
        dotenv.config();
        const app = express();
        const port = process.env.PORT || "3000";
        const server = http.createServer(app);
        app.get("/", (req, res) => {
            console.log(new Date(), pid, bingoProcess);
            res.end(`<html>Express + TypeScript Server ${pid}</html>`);
            process.exit(0);
        });
        app.get("/spacedata/:standard?", spacedata);
        app.listen(port, () => {
            console.log(`⚡️[child process ${pid} server]: Server is running at https://localhost:${port}`);
        });
    },
    deinit: function () {
    }
};

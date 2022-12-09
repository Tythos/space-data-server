import { get, post } from "../routes/spacedata/index";
import express, { Express, Request, Response } from 'express';
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import { cpus, totalmem, freemem } from "os";
import * as standards from "@/lib/standards/standards";
const app: Express = express();
const totalCPUs = cpus().length;
import { version } from "process";

app.use(bodyParser.json({ type: ['application/json', 'application/*+json'] }));
app.use(bodyParser.raw({ inflate: true, limit: "1GB", type: '*/*' }));
app.get("/", (req: Request, res: Response) => {
    res.end(`<html>
    <h2>DigitalArsenal.io Space Data Server Version: 1.0.0+1668633361148 </h2>
    <h2>Total CPU:${totalCPUs}</h2>
    <h2>Total Memory:${totalmem()}</h2>
    <h2>Free Memory:${freemem()}</h2>
    <h2>Node Version: ${version}</h2>
    <hr/>
    <h3><a href='./spacedata/omm/?query=[["select",["*"]]]&format=json'>Example</a></h3>
    <h3>API: spacedata/[${Object.keys(standards)}]?query=[["select",["*"]]]&format=[json, flatbuffer]</h3>
    <h3>JSON Schema: spacedata/[${Object.keys(standards)}]?schema=true</h3>
    </html>`);
});

app.get("/spacedata/:standard?", get);
app.post("/spacedata/:standard?", (post as any));

export { app };
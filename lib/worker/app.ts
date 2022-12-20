import { get, post } from "../routes/spacedata/index";
import express, { Express, Request, Response } from 'express';
import helmet from "helmet";
import cors from "cors";
import compression from "compression-next";
import { config } from "@/lib/config/config";
import bodyParser from "body-parser";
import { cpus, totalmem, freemem } from "os";
import * as standards from "@/lib/standards/standards";
import { standards as standardsRoute } from "../routes/standards";
const app: Express = express();
const totalCPUs = cpus().length;
import { version } from "process";
import { providers } from "@/lib/routes/spacedata/providers";

app.use(compression({
    level: 6, minlevel: 6, threshold: 512, filter: (req, res) => {
        return true;
    }
}));

app.use("/raw", express.static(config.data.public));
app.use(bodyParser.json({
    type: ['application/json', 'application/*+json'], verify: (req, res, buf) => {
        (req as any).rawBody = buf;
    }
}));
app.use(cors());
app.use(bodyParser.raw({ inflate: true, limit: "2GB", type: '*/*' }));
app.get("/", (req: Request, res: Response) => {
    res.end(`<html>
    <h2>DigitalArsenal.io Space Data Server Version: 1.0.0+1668633361148 </h2>
    <h2>Total CPU:${totalCPUs}</h2>
    <h2>Total Memory:${totalmem()}</h2>
    <h2>Free Memory:${freemem()}</h2>
    <h2>Node Version: ${version}</h2>
    <hr/>
    <h3><a href='./spacedata/omm/0x9858effd232b4033e47d90003d41ec34ecaeda94?query=[["select",["*"]]]&format=json'>Example JSON</a></h3>
    <h3><a href='./spacedata/omm/0x9858effd232b4033e47d90003d41ec34ecaeda94?query=[["select",["*"]]]&format=fbs'>Example FBS</a></h3>
    <h3>API: spacedata/[${Object.keys(standards)}]?query=[["select",["*"]]]&format=[json, flatbuffer]</h3>
    <h3>JSON Schema: spacedata/[${Object.keys(standards)}]?schema=true</h3>
    </html>`);
});
app.get("/providers/:provider?", providers);
app.get("/spacedata/:standard/:provider/:querytype?", get);
app.post("/spacedata/:standard?", (post as any));
app.get("/standards/:standard?", standardsRoute);

export { app };
import { get, latest, post } from "../routes/spacedata/index";
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
import { sql } from "@/lib/routes/standards/sql";
import { schema } from "@/lib/routes/standards/schema";

app.use(compression({
    level: 6, minlevel: 6, threshold: 512, filter: (req, res) => {
        return true;
    }
}));

app.use("/raw", express.static(config.data.public));
app.use("/app", express.static("UI/dist"));
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
    <h3><a href='./spacedata/latest/omm/0x9858effd232b4033e47d90003d41ec34ecaeda94?format=json'>Example JSON</a></h3>
    <h3><a href='./spacedata/latest/omm/0x9858effd232b4033e47d90003d41ec34ecaeda94?format=fbs'>Example FBS</a></h3>
    <h3>API: spacedata/[${Object.keys(standards)}]?query=[["select",["*"]]]&format=[json, flatbuffer]</h3>
    <h3>JSON Schema: schema/[${Object.keys(standards)}]</h3>
    <h3><a href='./schema/omm'>Example Schema</a></h3>
    <h3><a href='./sql'>Generated SQL</a></h3>
    <h3><a href='./app'>TEST APP</a></h3>
    </html>`);
});
app.get("/providers/:provider?", providers);
app.get("/schema/:standard", schema);
app.get("/spacedata/:standard/:provider?", get);
app.get('/spacedata/latest/:standard/:provider', latest);
app.post("/spacedata/:standard?", (post as any));
app.get("/standards/:standard?", standardsRoute);
app.get("/sql/", sql);

export { app };
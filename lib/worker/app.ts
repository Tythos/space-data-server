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
import { providers } from "@/lib/routes/spacedata/providers";
import { sql } from "@/lib/routes/standards/sql";
import { schema } from "@/lib/routes/standards/schema";
import apicache from "apicache";
import swaggerFile from "@/swagger-output.json";
import { ui } from "@/lib/ui/index";
const rawUI = Buffer.from(ui, "base64").toString();

let cache = apicache.middleware;

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
    // #swagger.description = 'Home'
    res.end(rawUI);
});

app.get("/swagger-json", (req: Request, res: Response) => {
    res.json(swaggerFile);
});

app.get("/docs/swagger-json", (req: Request, res: Response) => {
    res.json(swaggerFile);
});

app.get("/providers/:provider?", providers);
app.get("/schema/:standard", schema);
app.get("/spacedata/:standard/:provider/:cid?", get);
app.get('/spacedatalatest/:standard/:provider',
    cache(config.data.cache, (req: any, res: any) => res.statusCode === 200), latest);
app.post("/spacedata/:standard", (req: any, res: any, next: any) => {
    // #swagger.description = 'PostUp'
    post(req, res, next);
});
app.get("/standards/:standard?", standardsRoute);
app.get("/sql/", sql);

export { app };
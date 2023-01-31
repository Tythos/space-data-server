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
import { providers, provider, cid } from "@/lib/routes/spacedata/providers";
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

/*
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'self'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"],
    }
}));*/

app.enable('x-powered-by');

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
    // #swagger.ignore = true
    res.setHeader("content-type", "text/html");
    res.end(rawUI);
});
app.get("/swagger-json", (req: Request, res: Response) => {
    //#swagger.description = "Returns the OpenAPI 3.0 JSON API file."
    res.json(swaggerFile);
});
app.get("/providers/:provider?", (req: any, res: any, next: any) => {
    providers(req, res, next);
});
app.get("/cid/:provider/:standard", (req: any, res: any, next: any) => {
    //#swagger.description = "Returns the latest Content Identifier for a provider by standard.  If a query is provided, it will return the CIDs for a date range."
    //#swagger.autoQuery=true
    res.set("Content-Type", "application/json");
    cid(req, res, next)
});
app.get("/schema/:standard", (req: any, res: any, next: any) => {
    //#swagger.description = "Returns a JSON Schema for the standard."
    res.set("Content-Type", "application/json");
    schema(req, res, next)
});
app.get("/idl/:standard", (req: any, res: any, next: any) => {
    //#swagger.description = "Returns the Flatbuffer Interface Description Language (IDL) for the standard."
    res.set("Content-Type", "application/json");
    schema(req, res, next)
});
app.get("/spacedata/:standard/:provider/:cid?", (req: any, res: any, next: any) => {
    /*
    #swagger.description = `Returns data by standard, provider,
and optionally the Content Identifier (CID).  
The CID is created using a Flatbuffer of the returned data, regardless of the serialization selected. 
If no CID is specified, the most recent CID is used.  
The CID is always returned in the header "x-content-identifier".`;
    */
    get(req, res, next);
});
app.post("/spacedata/:standard", (req: any, res: any, next: any) => {
    post(req, res, next);
});
app.get("/standards/:standard?", (req: any, res: any, next: any) => {
    standardsRoute(req, res, next);
});
app.get("/sql/", (req: any, res: any, next: any) => {
    sql(req, res, next);
});

export { app };
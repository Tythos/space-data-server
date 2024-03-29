import { get, post, del } from "../routes/spacedata/index";
import express, { Express, Request, Response } from 'express';
import helmet from "helmet";
import cors from "cors";
import compression from "compression-next";
import { config } from "@/lib/config/config";
import bodyParser from "body-parser";
import { standards as standardsRoute } from "../routes/standards";
import { validateHeaders } from "@/lib/auth/index";
import { providers, cid } from "@/lib/routes/spacedata/providers";
import { sql } from "@/lib/routes/standards/sql";
import { schema } from "@/lib/routes/standards/schema";
import { idl } from "@/lib/routes/standards/idl";
import swaggerFile from "@/swagger-output.json";
import { ui } from "@/lib/ui/index";
import { echo } from "@/lib/routes/spacedata/echo";
import https from "https";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { Http2SecureServer } from "http2";
import { adminCheck, cwd, getSettings, saveSettings, getServerPublicKey, saveServerKey } from "../routes/admin";
import { fileReadPath } from "@/lib/config/config";
import WebSocket, { WebSocketServer } from "ws";

const rawUI = Buffer.from(ui, "base64").toString();

let app: Express | https.Server = express();
let wss: WebSocketServer;
let publicKeyCache: any = {};

app.use(compression({
    level: 6, minlevel: 6, threshold: 512, filter: (req, res) => {
        return true;
    }
}));

app.enable('x-powered-by');

app.use(validateHeaders);

app.use("/app", express.static("UI/dist"));
app.use(bodyParser.json({
    type: ['application/json', 'application/*+json'], verify: (req, res, buf) => {
        (req as any).rawBody = buf;
    }
}));
app.use(cors({ exposedHeaders: ["*"] }));
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

app.get("/manifest", (req: Request, res: Response) => {
    //#swagger.description = "Returns the Local Provider Manifest."
    res.setHeader("content-type", "application/json");
    res.sendFile(join(fileReadPath, "manifest.json"));
});

app.get("/providers/:provider?", (req: any, res: any, next: any) => {
    providers(req, res, next);
});

app.get("/cid/limit", (req: any, res: any, next: any) => {
    //#swagger.description = "Returns the page limit for number of CID records."
    //#swagger.autoQuery=true
    res.set("Content-Type", "application/json");
    res.json(config.database.limits);
    res.end();
});

app.get("/cid/:provider/:standard", (req: any, res: any, next: any) => {
    //#swagger.description = "Returns the latest Content Identifier for a provider by standard.  If a query is provided, it will return the CIDs for a date range."
    //#swagger.autoQuery=true
    res.set("Content-Type", "application/json");
    cid(req, res, next);
});
app.get("/schema/:standard", (req: any, res: any, next: any) => {
    //#swagger.description = "Returns a JSON Schema for the standard."
    res.set("Content-Type", "application/json");
    schema(req, res, next)
});
app.get("/idl/:standard", (req: any, res: any, next: any) => {
    // #swagger.ignore = true
    res.set("Content-Type", "application/json");
    idl(req, res, next)
});

app.get("/data/:standard/:cid?", (req: any, res: any, next: any) => {
    /*
    #swagger.description = `Returns data by standard, using the default server provider,
and optionally the Content Identifier (CID).  
The CID is created using a Flatbuffer of the returned data, regardless of the serialization selected. 
If no CID is specified, the most recent CID is used.  
The CID is always returned in the header "x-content-identifier".`;
    */

    try {
        if (!publicKeyCache?.ethAddress) {
            publicKeyCache = JSON.parse(readFileSync("./serverinfo.json", "utf8"));
        }

        req.params.provider = (process as any).publicKey?.ethAddress;
        get(req, res, next);
    } catch (e) {
        console.log(e)
        res.status = 500;
        res.end();
    }
});

app.get(`/spacedatanetwork/:provider/:standard/:cid?`, (req: any, res: any, next: any) => {
    /*
    #swagger.description = `Returns data by standard, provider,
and optionally the Content Identifier (CID).  
The CID is created using a Flatbuffer of the returned data, regardless of the serialization selected. 
If no CID is specified, the most recent CID is used.  
The CID is always returned in the header "x-content-identifier".`;
    */
    get(req, res, next);
});

app.delete(`/spacedatanetwork/:standard?`, (req: any, res: any, next: any) => {
    /*
    #swagger.description = `Deletes a file by CID`;
    */
    del(req, res, next);
});

app.post("/echo/:standard", (req: any, res: any, next: any) => {
    // #swagger.ignore = true
    echo(req, res, next);
});
app.post(`/spacedatanetwork/:standard`, (req: any, res: any, next: any) => {
    post(req, res, next);
});
app.get("/standards/:standard?", (req: any, res: any, next: any) => {
    standardsRoute(req, res, next);
});
app.get("/sql/", (req: any, res: any, next: any) => {
    sql(req, res, next);
});

app.get("/admin/settings", getSettings);
app.get("/admin/check", adminCheck);

app.post("/admin/settings", saveSettings);
app.get("/admin/cwd", (req: any, res: any, next: any) => {
    cwd(req, res, next);
});

app.get("/publicKey", getServerPublicKey);

app.post("/admin/saveServerKey", saveServerKey);

try {
    let key = join(__dirname, "..", config.server.key || "");
    let cert = join(__dirname, "..", config.server.cert || "");

    if (existsSync(key) && existsSync(cert)) {
        key = readFileSync(key, "utf8");
        cert = readFileSync(cert, "utf8");
        app = https.createServer({ key, cert }, app);
        wss = new WebSocket.Server({ server: app })
    }
} catch (e) { }

export { app, wss };
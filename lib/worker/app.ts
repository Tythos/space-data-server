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
}));

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
    res.json(swaggerFile);
    /**
     #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: ""
                    }  
                }
            }
        } 
     */
});

app.get("/docs/swagger-json", (req: Request, res: Response) => {
    res.json(swaggerFile);
    /**
      #swagger.requestBody = {
             required: true,
             content: {
                 "application/json": {
                     schema: {
                         $ref: ""
                     }  
                 }
             }
         } 
      */
});

app.get("/providers/:provider?", (req: any, res: any, next: any) => {
    /**
     #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: ""
                    }  
                }
            }
        } 
     */
    providers(req, res, next);
});
app.get("/schema/:standard", (req: any, res: any, next: any) => {
    res.set("Content-Type", "application/json");
    /**
     #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: ""
                    }  
                }
            }
        } 
     */
    schema(req, res, next)
});
app.get("/spacedata/:standard/:provider/:cid?", (req: any, res: any, next: any) => {
    /**
    #swagger.requestBody = {
           required: true,
           content: {
               "application/json": {
                   schema: {
                       $ref: ""
                   }  
               }
           }
       } 
    */
    get(req, res, next)
});
app.get('/spacedatalatest/:standard/:provider',
    cache(config.data.cache, (req: any, res: any) => res.statusCode === 200),
    (req: any, res: any, next: any) => {
        /**
         #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: ""
                        }  
                    },
                    "application/octet-stream": {
                        schema: {
                            $ref: ""
                        }  
                    }
                }
            } 
     */
        latest(req, res, next);
    });
app.post("/spacedata/:standard", (req: any, res: any, next: any) => {
    /**
     #swagger.parameters["authorization"] = {
        in:"header",
        description:"An EIP-4361 signed message",
        type:"string",
        format:"utf-8"
     }
     
     #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: ""
                    }  
                },
                "application/octet-stream": {
                    schema: {
                        $ref: ""
                    }  
                }
            }
        } 
     */
    post(req, res, next);
});

app.get("/standards/:standard?", (req: any, res: any, next: any) => {
    /**
     #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: ""
                    }  
                }
            }
        } 
     */
    standardsRoute(req, res, next);
});

app.get("/sql/", (req: any, res: any, next: any) => {
    /**
    #swagger.requestBody = {
           required: true,
           content: {
               "application/text-plain": {
                   schema: {
                       $ref: ""
                   }  
               }
           }
       } 
    */
    sql(req, res, next);
});

export { app };
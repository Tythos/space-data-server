import { Request, Response } from "express";
import * as express from "express";
import standardsSchema from "@/lib/standards/schemas.json";


export const standards: express.RequestHandler = async (req: Request, res: Response, next: Function) => {
    const standard = req.params?.standard?.toUpperCase()
    if (standardsSchema[standard]) {
        res.set("content-type", "application/json; charset=utf-8");

        res.end(JSON.stringify(standardsSchema[standard], null, 4));
    } else {
        res.status(404);
        res.end(`Standard "${standard}" Not Found.  Please select a supported standard: ${Object.keys(standardsSchema)}`)
    }
    next();

}
import { Request, Response } from "express";
import packageJSON from "@/package.json";
import * as standards from "./standards.js";

export default (req: Request, res: Response, next: Function) => {
    if (!req.params.standard) {
        res.send(Object.keys(standards));
    } else {
        const predicate = req.params.standard.toUpperCase() + "T";
        let dClass: any;
        if (dClass = standards[predicate as keyof typeof standards]) {
            let tt = new dClass();
            res.write(`<div>${JSON.stringify(tt, null, 4)}</div>`);
        }
        res.end(`<script>setTimeout(()=>window.location = window.location, 1000)</script>`);
    }

    next();
};
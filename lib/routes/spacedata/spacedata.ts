import { Request, Response } from "express";
import packageJSON from "@/package.json";
import * as standards from "./standards.js";

export default (req: Request, res: Response, next: Function) => {
    if (!req.params.standard) {
        res.send(Object.keys(standards));
    } else {
        let tt = new (standards as unknown as any)[req.params.standard.toUpperCase()+"T"]();
        console.log(tt);
        res.send(`<div>${JSON.stringify(tt, null, 4)}</div><script>setTimeout(()=>window.location = window.location, 1000)</script>`);
    }

    next();
};
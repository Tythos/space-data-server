import { Request, Response } from "express";
import { readdirSync } from "fs";
import packageJSON from "@/package.json";

let standards = readdirSync("./lib/class/standards");
export default (req: Request, res: Response, next: Function) => {
    if (!req.params.standard) {
        res.send(standards);
    } else {
        res.send(req.params.standard)
    }

    next();
}
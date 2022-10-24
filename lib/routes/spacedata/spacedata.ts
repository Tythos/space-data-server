import { Request, Response } from "express";
import packageJSON from "@/package.json";
import * as standards from "@/lib/standards/standards";
import * as flatbuffers from "flatbuffers";
import { Parser } from "json2csv";

export default (req: Request, res: Response, next: Function) => {
    if (!req.params.standard) {
        res.send(Object.keys(standards));
    } else {
        const standard = req.params.standard.toUpperCase();
        const predicate = standard + "T";
        let dClass: any;
        let dClassCollection: any;
        if (dClass = standards[predicate as keyof typeof standards]) {
            dClassCollection = standards[standard + "COLLECTIONT" as keyof typeof standards];
            let _standard = new dClass();
            let _collection = new dClassCollection();
            _collection.RECORDS.push(_standard);

            let payload;
            let { format } = req.query;
            format = format?.toString().toLowerCase();
            if (format === "csv") {
                res.end(Object.keys(_standard).join());
            } else if (format === "json") {
                res.write(JSON.stringify(_collection));
            } else {
                let flatBufferBuilder = new flatbuffers.Builder(1);
                flatBufferBuilder.finish(_collection.pack(flatBufferBuilder));
                payload = flatBufferBuilder.asUint8Array();
            }
            //console.log(JSON.stringify(_collection, null, 4));
        }
        //res.end(`${JSON.stringify(req.query, null, 4)}<script>setTimeout(()=>window.location = window.location, 1000)</script>`);
    }

    next();
};
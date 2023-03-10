import { writeFB } from "@/lib/utility/flatbufferConversion";

export const formatResponse = (req: any, res: any, payload: any) => {
    console.log(req.accepts("json"), req.accepts("application/octet-stream"))
    if (req.accepts("application/octet-stream")) {
        payload = writeFB(payload);
    } else if (req.accepts("json")) {
        payload = JSON.stringify(payload);
    } else {
        res.statusCode = 500;
        payload = JSON.stringify({ "Unknown Accept Header Value": req.headers.accept });
    }
    return payload;
}
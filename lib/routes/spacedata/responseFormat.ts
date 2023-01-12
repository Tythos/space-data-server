import { writeFB } from "@/lib/utility/flatbufferConversion";

export const formatResponse = (req: any, res: any, payload: any) => {
    if (req.accepts("json")) {
        payload = JSON.stringify(payload);
    } else if (req.accepts("octet-stream")) {
        payload = writeFB(payload);
    } else {
        res.statusCode = 500;
        payload = { "Unknown Accept Header Value": req.headers.accept };
    }
    return payload;
}
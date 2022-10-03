import { readdirSync } from "fs";
let standards = readdirSync("./lib/class/standards");
export default (req, res, next) => {
    if (!req.params.standard) {
        res.send(standards);
    }
    else {
        res.send(req.params.standard);
    }
    next();
};

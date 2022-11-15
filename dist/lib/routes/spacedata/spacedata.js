import * as standards from "../../../lib/standards/standards";
export default (req, res, next) => {
    if (!req.params.standard) {
    }
    else {
        return Object.keys(standards);
    }
    next();
};

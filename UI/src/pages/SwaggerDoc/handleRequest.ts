import { pathToRegexp, match, parse, compile } from "path-to-regexp";
const convertSwaggerPathToExpress = (path) => {
    return path.replace(/{/g, ':').replace(/}/g, '');
}
export const handleRequest = async (baseurl, activeRoute, methodId, paramDetails, requestParams, requestBodyExample) => {
    const { route, method } = activeRoute;
    const reqParams = Object.entries(requestParams).filter(
        (x) => x[0].indexOf(methodId) > -1
    );
    const params = {};
    if (reqParams.length > 0) {
        reqParams.forEach((x) => {
            const paramName = `${x[0].split("-")[2]}`;
            const paramIn = paramDetails.find(
                (param) => param.name === paramName
            ).in;
            if (paramIn == "query") {
                params[paramName] = x[1];
            }
        });
    }
    const headers = { "Content-Type": "application/json" };
    const inPath = {};
    paramDetails.forEach((x) => {
        if (x.in === "path") {
            if (
                reqParams.length > 0 &&
                reqParams.find((param) => param[0] === `${methodId}-${x.name}`)[1]
            ) {
                inPath[x.name] = reqParams.find(
                    (param) => param[0] === `${methodId}-${x.name}`
                )[1]; // paramDetails.indexOf(param => param.name === x.name)params[x.name]
            } else {
                inPath[x.name] = null;
            }
        }
        if (x.in === "header") {
            if (
                reqParams.length > 0 &&
                reqParams.find((param) => param[0] === `${methodId}-${x.name}`)[1]
            ) {
                headers[x.name] = reqParams.find(
                    (param) => param[0] === `${methodId}-${x.name}`
                )[1];
            }
        }
    });
    const toPath = compile(convertSwaggerPathToExpress(route), { encode: encodeURIComponent });
    const encodedUri = toPath(inPath);
    console.log(encodedUri)
    const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");
    const url = `${baseurl}${encodedUri}${queryString ? `?${queryString}` : ""
        }`;
    return await fetch(url, {
        method: method.toUpperCase(), // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: headers,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: requestBodyExample[methodId], // JSON.stringify(data) // body data type must match "Content-Type" header
    });

    //response.json(); // parses JSON response into native JavaScript objects
};
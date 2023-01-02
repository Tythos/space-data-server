import { execSync } from "node:child_process";

export default function (options) {
    let Config = null;
    return {
        name: "show-config",
        config(config) {
            Config = config;
        },
        buildEnd() {
            execSync("cd .. && node ./scripts/uiBuild.mjs");
        }
    };

}
import { execSync } from "node:child_process";

export default function (options) {
    let Config = null;
    return {
        name: "show-config",
        config(config) {
            Config = config;
        },
        buildEnd() {
            setTimeout(() => {
                console.log("Awaiting file write...");
                execSync("cd .. && node ./scripts/uiBuild.mjs");
            }, 5000)
        }
    };

}
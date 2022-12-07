import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import defaultConfig from "./config.json";

const configPath = join(__dirname, "config.json");
export let config: any;
export let initConfig = () => {
    console.log(configPath)
    if (!existsSync(configPath)) {
        writeFileSync(configPath, JSON.stringify(defaultConfig, null, 4));
    }
    try {
        config = JSON.parse(readFileSync(configPath, "utf8"));
        console.log(config)
    } catch (e) {
        throw Error(`Failed to parse config at ${configPath}`);
    }
}
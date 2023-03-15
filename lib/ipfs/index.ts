import { join } from "path";
import { ChildProcess, exec } from 'node:child_process';
import { promisify } from "node:util";
const execP = promisify(exec);
import { existsSync, mkdirSync, writeFileSync, rmSync, readdirSync } from "fs";
import { execSync, spawn } from "child_process";
const rootDir = join(__dirname, "..");
const ipfsPath = process.env.IPFS_PATH || join(rootDir, "go-ipfs/");
const env = { IPFS_PATH: ipfsPath };

/* TODO
- https://docs.ipfs.tech/how-to/command-line-quick-start/
- Start IPFS service using `child_process`
- ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/9001
- ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001
- Set environment variable: `export IPFS_PATH="{pwd}/go-ipfs"` (or wherever)
- run `ipfs init`
- Import keys using custom IPFS format
- Add / remove pins
- Add / remove peers
*/

interface Key {
    Name: string;
    Id: string;
}

interface Data {
    Keys: Key[];
}

const keyName: string = "SpaceDataServer_Key";

function getKeyId(data: Data, targetKey: string, fallbackKey: string): string | null {
    const target = data.Keys.find((key) => key.Name === targetKey);
    if (target) {
        return target.Id;
    }

    const fallback = data.Keys.find((key) => key.Name === fallbackKey);
    if (fallback) {
        return fallback.Id;
    }

    return null;
}

export interface IPFSController {
    process: ChildProcess,
    gatewayPort: Number,
    apiPort: Number,
    env: {
        IPFS_PATH: string
    },
    api: Function,
    publishDirectory: Function,
    isInstanceActive: Function
}

export class IPFSUtilities {
    static importKey = function (key: ArrayBuffer) {
        const keyPath = `${rootDir}/.keys`;
        if (!existsSync(keyPath)) {
            mkdirSync(keyPath);
        }
        let { env } = this;
        let fileName = `${keyPath}/${keyName}.proto`;
        writeFileSync(fileName, Buffer.from(key as ArrayBuffer));
        let output: any;
        try {
            const options = { stdio: 'pipe' };
            output = execSync(`${ipfsPath}ipfs key rm ${keyName}`, { env }).toString();
            output = execSync(`${ipfsPath}ipfs key import ${keyName} ${fileName} --allow-any-key-type`, { env }).toString();
        } catch (error: any) {
            output = error.toString();
        }

        rmSync(fileName);
        return output;
    };
}

export interface IPFSControllerCollection {
    [key: string]: IPFSController;
}

let ipfsControllerCollection: IPFSControllerCollection = {};

const apiArgs = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: ""
};

const isInstanceActive = function () {
    return this.process.exitCode === null;
}

const api = async function (path: string, queryString: object = {}, args: object = {}) {
    args = Object.assign({}, apiArgs, args);
    let returnContent;

    let apiCall = await fetch(`http://127.0.0.1:${this.apiPort}/api/v0${path}` + (queryString ? "?" + new URLSearchParams(queryString as any) : ""), args);
    let { ok, statusText } = apiCall;
    if (ok) {
        let returnObj = await apiCall.text();
        returnContent = returnObj;
        try {
            returnContent = JSON.parse(returnObj);
        } catch (e) {

        }
    } else {
        return { error: "not ok", statusText }
    }
    return returnContent;
}



const publishDirectory = async function (folder: string) {
    let output;
    let start = performance.now();
    if (!readdirSync(folder).length) return "Empty Directory";
    console.log(`Pin started at: ${new Date()} for folder ${folder}`);
    try {
        const options = { stdio: 'pipe' };
        output = execSync(`cd ${folder} && ${ipfsPath}ipfs add -w -r *`, { env }).toString();
    } catch (error: any) {
        output = error.toString();
    }
    console.log(`Pin took: ${performance.now() - start} for folder ${folder}`);
    let folderHash = output.match(/added\s.*/g)?.pop()?.split(" ")[1];
    console.log(folderHash);
    const keys = await this.api("/key/list");

    const keyId = getKeyId(keys, 'SpaceDataServer_Key', 'self');

    console.log(keyId);

    setTimeout(() => {
        try {
            output = execSync(`${ipfsPath}ipfs name publish --key=${keyId} ${folderHash}`, { env }).toString();
            console.log(output);
        } catch (e) {
            console.log(e)
        }
    }, 5000)
    return folderHash;
}

export const startIPFS = async (gatewayPort: Number = 5001, apiPort: Number = 9001, folderPath: string = ""): Promise<any> => {

    let IPFS_PATH = join(ipfsPath, folderPath.length ? folderPath : gatewayPort.toString());

    if (!existsSync(IPFS_PATH)) {
        mkdirSync(IPFS_PATH);
    }

    const execPath = `${ipfsPath}ipfs`;

    try {
        await execP(`${execPath} init`, { env });
    } catch (e) {
    }

    const cmds = [`${execPath} config Addresses.Gateway /ip4/0.0.0.0/tcp/${gatewayPort}`,
    `${execPath} config Addresses.API /ip4/0.0.0.0/tcp/${apiPort}`];
    await execP(
        cmds.join("&&"),
        { env });
    ipfsControllerCollection[gatewayPort.toString()] = {
        env,
        process: spawn(`${ipfsPath}ipfs`, ["daemon"], { env }),
        gatewayPort,
        apiPort,
        api,
        publishDirectory,
        isInstanceActive
    } as IPFSController;

    return ipfsControllerCollection[gatewayPort.toString()];
}

export const cleanUpFolder = () => { }
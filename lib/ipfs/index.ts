import { join } from "path";
import { ChildProcess, exec } from 'node:child_process';
import { promisify } from "node:util";
const execP = promisify(exec);
import { existsSync, mkdirSync, writeFileSync, rmSync, readdirSync } from "fs";
import { execSync, spawn } from "child_process";
const rootDir = join(__dirname, "..");
const ipfsPath = process.env.IPFS_PATH || join(rootDir, "go-ipfs/");

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

export interface IPFSController {
    process: ChildProcess,
    gatewayPort: Number,
    apiPort: Number,
    env: {
        IPFS_PATH: string
    },
    api: Function,
    importKey: Function,
    publishDirectory: Function,
    isInstanceActive: Function
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

const api = async function (path: string, queryString: object, args: object = {}) {
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

const importKey = function (key: ArrayBuffer, keyName: string) {
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
        output = execSync(`${ipfsPath}ipfs key import ${keyName} ${fileName} --allow-any-key-type`, { env }).toString();
    } catch (error: any) {
        output = error.toString();
    }

    rmSync(fileName);
    return output;
}

const publishDirectory = function (folder: string) {
    let output;
    let { env } = this;
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
    setTimeout(() => {
        try {
            output = execSync(`${ipfsPath}ipfs name publish --key=k51qzi5uqu5dje4na46s4ti0ncyar3jdffp5h68zffbn6mks5jxr3h8ctjlqbh ${folderHash}`, { env }).toString();
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

    const env = { IPFS_PATH };
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
        importKey,
        publishDirectory,
        isInstanceActive
    } as IPFSController;

    return ipfsControllerCollection[gatewayPort.toString()];
}

export const cleanUpFolder = () => { }
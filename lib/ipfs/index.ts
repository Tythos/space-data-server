import { join } from "path";
import { ChildProcess, exec } from 'node:child_process';
import { promisify } from "node:util";
const execP = promisify(exec);
import { KeyValueDataStructure } from "../class/utility/KeyValueDataStructure";
import { mkdir, existsSync, rmdirSync, mkdirSync } from "fs";
import { spawn, spawnSync } from "child_process";
const ipfsPath = join(__dirname, "../../", "go-ipfs/");

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
    args = Object.assign({}, args, apiArgs);
    let apiCall = fetch(`http://127.0.0.1:${this.apiPort}/api/v0${path}` + (queryString ? new URLSearchParams(queryString as any) : ""), args);
    let returnObj = await (await apiCall).json();
    return returnObj;
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
        process: spawn("/home/tj/software/space-data-server/go-ipfs/ipfs", ["daemon"], { env }),
        gatewayPort,
        apiPort,
        api,
        isInstanceActive
    } as IPFSController;

    return ipfsControllerCollection[gatewayPort.toString()];
}

export const cleanUpFolder = () => { }
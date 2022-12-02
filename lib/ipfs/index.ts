import { join } from "path";
import { ChildProcess, exec } from 'node:child_process';
import { KeyValueDataStructure } from "../class/utility/KeyValueDataStructure";
import { mkdir, existsSync, rmdirSync, mkdirSync } from "fs";
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
    api: Function
}

export interface IPFSControllerCollection {
    [key: string]: IPFSController;
}

let ipfsDaemons: IPFSControllerCollection = {};

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
    const cmds = [`${execPath} config Addresses.Gateway /ip4/0.0.0.0/tcp/${gatewayPort}`,
    `${execPath} config Addresses.API /ip4/0.0.0.0/tcp/${apiPort}`,
    `${execPath} daemon`];

    ipfsDaemons[gatewayPort.toString()] = {
        env,
        process: await exec(
            cmds.join("&&"),
            { env }) as ChildProcess,
        gatewayPort,
        apiPort,
        api
    } as IPFSController;

    return ipfsDaemons[gatewayPort.toString()];
}

export const stopIPFS = async (gatewayPort: Number) => {
    if (!gatewayPort) {
        throw Error(`Unknown IPFS Instance ${gatewayPort}`);
    } else {
        return ipfsDaemons[gatewayPort.toString()].process.kill();
    }
}

export const cleanUpFolder = () => { }
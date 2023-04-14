import { join } from "path";
import { ChildProcess, exec } from 'node:child_process';
import { promisify } from "node:util";
const execP = promisify(exec);
import { existsSync, mkdirSync, writeFileSync, rmSync, readdirSync, readFileSync, chmodSync, writeFile } from "fs";
import { execSync, spawn } from "child_process";
import { FormatOptions, keyconverter } from "../../../keyconverter/src/keyconverter";
import * as bip39 from "bip39";

const rootDir = process.cwd();
const ipfsPath = process.env.IPFS_PATH || join(rootDir, "go-ipfs");
const keyPath = `${rootDir}/.keys`;

mkdirSync(keyPath, { recursive: true });


const env = { IPFS_PATH: ipfsPath };

const kCArgs = {
    kty: "EC",
    name: "ECDSA",
    namedCurve: "K-256",
    hash: "SHA-256"
} as EcKeyGenParams;

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

export const keyName: string = "SpaceDataServer_Key";
export const pKeyLength: number = 128;
export const defaultGatewayPort = 5002;
export const defaultAPIPort = 9002;

function getKeyId(data: Data, targetKey: string, fallbackKey: string): Key {
    const target = data?.Keys?.find((key) => key.Name === targetKey);
    if (target) {
        return target;
    } else {
        const fallback = data.Keys.find((key) => key.Name === fallbackKey) as Key;
        return fallback;
    }
}

export interface IPFSController {
    process: ChildProcess,
    gatewayPort: Number,
    apiPort: Number,
    env?: {
        IPFS_PATH: string
    },
    api: Function,
    importKey: Function,
    publishDirectory: Function,
    isInstanceActive: Function
}

const importKey = async function (key: ArrayBuffer, inputKeyName: string = keyName) {

    let fileName = `${keyPath}/${Date.now()}.proto`;
    writeFileSync(fileName, Buffer.from(key as ArrayBuffer));
    let output: any;

    output = await api(`/key/rm?arg=${inputKeyName}`, undefined, undefined, defaultAPIPort);

    if (!output.error) {
        output = execSync(`${ipfsPath}/ipfs key import ${inputKeyName} ${fileName} --allow-any-key-type`, { env }).toString();
    }
    
    rmSync(fileName);

    return output;
};

export class IPFSUtilities {
    static importKey = importKey

    static exportKey = function (inputKeyName: string = keyName, fileName?: string) {

        if (!existsSync(keyPath)) {
            mkdirSync(keyPath);
        }

        const keyFile = `${keyPath}/${fileName || inputKeyName}`;

        let output: any;

        try {
            output = execSync(`${ipfsPath}/ipfs key export ${inputKeyName} -o=${keyFile}`, { env }).toString();
        } catch (error: any) {
            output = error.toString();
            console.log("ERROR", output)
        }

        return output;
    };

    static readKey = async function (inputKeyName: string = keyName, format: FormatOptions, keyLength: number = pKeyLength): Promise<any> {
        const fileName = `${performance.now()}.proto`;
        IPFSUtilities.exportKey(inputKeyName, fileName);
        const fileNamePath = join(keyPath, fileName);
        try {
            let keyProtoBuf = readFileSync(fileNamePath);
            let kC2 = new keyconverter(kCArgs, keyLength);
            rmSync(fileNamePath);
            await kC2.import(keyProtoBuf, "ipfs:protobuf");
            return await kC2.export(format, "private");
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
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

const api = async function (path: string, args: object = {}, contentTypeOverride?: string, apiPort?: number) {
    const uargs = Object.assign({}, apiArgs, args);
    let returnContent: any = null;
    let error;
    let tries = 0;
    while (tries < 5 && !returnContent) {
        try {
            let apiCall = await fetch(`http://127.0.0.1:${apiPort || this.apiPort}/api/v0${path}`, uargs as any);
            let { ok, statusText, headers } = apiCall;
            let contentType = contentTypeOverride || headers.get("content-type");
            if (ok) {
                if (contentType === "application/json") {
                    returnContent = await apiCall.json();
                } else if (contentType === "text/plain") {
                    returnContent = Buffer.from(await apiCall.arrayBuffer());
                }
            } else {
                error = { error: "not ok", statusText }
            }
        } catch (e) {
            error = { error: "not ok", statusText: (e as any).toString() }
        }
        tries++;
    }
    return returnContent || error;
}

const publishDirectory = async function (folder: string) {
    let output;
    let start = performance.now();

    if (!readdirSync(folder).length) {
        writeFileSync(join(folder, 'manifest.json'), "{}");
    }

    console.log(`Pin started at: ${new Date()} for folder ${folder}`);

    try {
        const options = { stdio: 'pipe' };
        output = execSync(`cd ${folder} && ${ipfsPath}/ipfs add -w -r *`, { env }).toString();
    } catch (error: any) {
        output = error.toString();
    }

    console.log(`Pin took: ${performance.now() - start} for folder ${folder}`);

    let folderHash = output.match(/added\s.*/g)?.pop()?.split(" ")[1];

    console.log(folderHash);

    const keys = await this.api("/key/list");

    const keyId = getKeyId(keys, 'SpaceDataServer_Key', 'self').Id;

    setTimeout(() => {
        try {
            output = execSync(`${ipfsPath}/ipfs name publish --key=${keyId} ${folderHash}`, { env }).toString();
            console.log(output);
        } catch (e) {
            console.log(e)
        }
    }, 5000)
    return folderHash;
}

export const startIPFS = async (gatewayPort: Number = defaultGatewayPort, apiPort: Number = defaultAPIPort, folderPath: string = ""): Promise<any> => {

    let IPFS_PATH = join(ipfsPath, folderPath.length ? folderPath : gatewayPort.toString());

    if (!existsSync(IPFS_PATH)) {
        mkdirSync(IPFS_PATH);
    }

    const execPath = `${ipfsPath}/ipfs`;

    try {
        await execP(`${execPath} init`);
    } catch (e) {

    }
    const gPS = gatewayPort.toString();
    const cmds = [`${execPath} config Addresses.Gateway /ip4/0.0.0.0/tcp/${gatewayPort}`,
    `${execPath} config Addresses.API /ip4/127.0.0.1/tcp/${apiPort}`];

    for (let cmd in cmds) {
        await execP(cmds[cmd], { env });
    }

    let iPSC = ipfsControllerCollection[gPS] = {
        env,
        process: spawn(execPath, ["daemon"], { env }),
        gatewayPort,
        apiPort,
        api,
        importKey,
        publishDirectory,
        isInstanceActive
    } as IPFSController;

    await new Promise((resolve, reject) => { setTimeout(resolve, 1000) });

    //Create Default SpaceDataServer_Key if none exist
    const keys = await iPSC.api("/key/list");
    let key = getKeyId(keys, "SpaceDataServer_Key", "self");
    if (key.Name === "self") {
        let kC = new keyconverter(kCArgs, pKeyLength);
        let mm = bip39.generateMnemonic(pKeyLength);
        await kC.import(mm, "bip39");
        await iPSC.importKey(
            await kC.export("ipfs:protobuf", "private") as ArrayBuffer,
            keyName);
    }

    return iPSC;
}
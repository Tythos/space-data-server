import { IPFSController, IPFSUtilities, startIPFS } from "../../lib/ipfs/index";
import { keyconverter } from "keyconverter/src/keyconverter";
import { mnemonicToEntropy } from "bip39";
import { join } from "path";
import delay from "delay";
import { readFileSync } from "fs";

const gatewayPort = 5002;
const apiPort = 9002;
const keyName = "mykey" + performance.now();
const mnemonic = `${Array(12).join("abandon ")}about`;
let kC = new keyconverter({ kty: "EC", name: "ECDSA", namedCurve: "K-256", hash: "SHA-256" } as EcKeyGenParams);
const entropy = mnemonicToEntropy(mnemonic);

let binKey;

describe('Test Publishing to IPFS', () => {
    let ipfsController: IPFSController;

    beforeAll(async () => {
        ipfsController = await startIPFS(gatewayPort, apiPort);
        await delay(3000);
        const keys = await ipfsController.api("/key/list");
        await kC.import(Buffer.from(entropy).toString('hex'));
        binKey = await kC.export("ipfs:protobuf", "private") as ArrayBuffer;
    });

    test('Start Instance', async () => {
        expect(ipfsController.gatewayPort).toEqual(gatewayPort);
        expect(ipfsController.apiPort).toEqual(apiPort);
        expect(ipfsController.isInstanceActive()).toEqual(true);
        let swarm = await ipfsController.api(`/swarm/peers`);
        expect(swarm.Peers.length).toBeGreaterThan(0);

    }, 10000);

    test("should list keys", async () => {
        const keys = await ipfsController.api("/key/list");
        expect(keys).toBeDefined();
        expect(keys).toHaveProperty("Keys");
        expect(Array.isArray(keys.Keys)).toBeTruthy();
    });

    test("should add a new key (Note: API cannot generate secp256k1 keys)", async () => {
        const key = await ipfsController.api(`/key/gen?arg=${keyName}`);
        expect(key).toBeDefined();
        expect(key).toHaveProperty("Name", keyName);
        expect(key).toHaveProperty("Id");
    });

    test("should remove a key", async () => {
        const keys = await ipfsController.api("/key/list");
        // check if current key name exists in the list
        const keyNames = keys.Keys.map((key: any) => key.Name);
        expect(keyNames).toContain(keyName);
        const response = await ipfsController.api(`/key/rm?arg=${keyName}`);
        const { Name } = response.Keys[0];
        expect(Name).toBeDefined();
        expect(Name).toEqual(keyName);

    });

    test('should add a key to IPFS and return its CID', async () => {
        let keyName = "test-protobuf-key";
        const removeKey = await ipfsController.api(`/key/rm?arg=${keyName}`);

        let hash = IPFSUtilities.importKey(binKey, keyName);
        expect(typeof hash).toBe('string');
        const keys = await ipfsController.api("/key/list");
        // check if current key name exists in the list
        const keyNames = keys.Keys.map((key: any) => key.Name);
        expect(keyNames).toContain(keyName);
    });

    test('should export a key from IPFS', async () => {
        let keyName = "test-protobuf-key";
        let keyFileName = "test-protobuf-key.export.proto";
        await IPFSUtilities.exportKey(keyName, keyFileName);
        let keyProtoBuf = readFileSync(join(process.cwd(), ".keys", `${keyFileName}`));
        expect(keyProtoBuf).toEqual(binKey);
        let kC2 = new keyconverter({ kty: "EC", name: "ECDSA", namedCurve: "K-256", hash: "SHA-256" } as EcKeyGenParams);
        await kC2.import(keyProtoBuf, "ipfs:protobuf");
        expect(await kC2.export("bip39", "private")).toEqual(mnemonic);
    });

    test('should read a key', async () => {
        let keyName = "test-protobuf-key";
        expect(await IPFSUtilities.readKey(keyName, "bip39")).toEqual(mnemonic);
    });

    test('should remove a key', async () => {
        let keyName = "test-protobuf-key";
        const response = await ipfsController.api(`/key/rm?arg=${keyName}`);
        const { Name } = response.Keys[0];
        expect(Name).toBeDefined();
        expect(Name).toEqual(keyName);
    });

    test("End Instance", async () => {
        ipfsController.process.kill();
        await delay(10000);
        expect(ipfsController.isInstanceActive()).toBe(false);
    }, 20000);

    afterAll(async () => {
        ipfsController.process.kill('SIGKILL');
    });

});

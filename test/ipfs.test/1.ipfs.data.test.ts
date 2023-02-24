import { IPFSController, startIPFS } from "@/lib/ipfs/index";
import { ChildProcess, execSync, spawn } from "child_process";
import * as keyconvert from "@/packages/keyconvert/src/keyconvert";
console.log(keyconvert);
import delay from "delay";

const gatewayPort = 5002;
const apiPort = 9002;
const keyName = "mykey";

describe('Test Publishing to IPFS', () => {
    let ipfsController: IPFSController;

    beforeAll(async () => {
        ipfsController = await startIPFS(gatewayPort, apiPort);

    });

    test('Start Instance', async () => {

        let ipfsController: any = await startIPFS(gatewayPort, apiPort);
        expect(ipfsController.gatewayPort).toEqual(gatewayPort);
        expect(ipfsController.apiPort).toEqual(apiPort);
        expect(ipfsController.isInstanceActive()).toEqual(true);
        await delay(3000);

        let swarm = await ipfsController.api(`/swarm/peers`);
        expect(swarm.Peers.length).toBeGreaterThan(0);

    }, 10000);

    test("should list keys", async () => {
        const keys = await ipfsController.api("/key/list");
        expect(keys).toBeDefined();
        expect(keys).toHaveProperty("Keys");
        expect(Array.isArray(keys.Keys)).toBeTruthy();
    });

    test("should add a new key", async () => {

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

    /*
    test('should add a key to IPFS and return its CID', async () => {
        const filePath = '/path/to/keyfile';
        const fileContent = 'key content';
        let privateKeyHex = "77076d0a7318a57d3c16c17251b26645df4c2f87ebc0992ab177fba51db92c2a";

        const addedKey = await ipfsController.api('add', {}, {
            method: 'POST',
            body: fileContent,
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        });

        expect(addedKey).toHaveProperty('Hash');
        expect(typeof addedKey.Hash).toBe('string');
    });*/

    test("End Instance", async () => {
        ipfsController.process.kill('SIGKILL');
        expect(ipfsController.isInstanceActive()).toBe(false);
        await delay(3000);
        console.log(ipfsController.process.killed);
    });

});

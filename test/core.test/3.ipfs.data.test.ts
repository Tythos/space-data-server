import { IPFSController, startIPFS } from "@/lib/ipfs/index";
import { ChildProcess, execSync, spawn } from "child_process";
import delay from "delay";
describe('Test Publishing to IPFS', () => {
    test('Post Data', async () => {
        const gatewayPort = 5002;
        const apiPort = 9002;
        let ipfsController: any = await startIPFS(gatewayPort, apiPort);
        expect(ipfsController.gatewayPort).toEqual(gatewayPort);
        expect(ipfsController.apiPort).toEqual(apiPort);
        await delay(3000);
        let swarm = await ipfsController.api(`/swarm/peers`);
        expect(swarm.Peers.length).toBeGreaterThan(0);
        ipfsController.process.kill('SIGKILL');
        expect(ipfsController.process.killed).toBe(true);
    }, 10000)
});
import { IPFSController, startIPFS, stopIPFS } from "@/lib/ipfs/index";

describe('Test Publishing to IPFS', () => {
    test('Post Data', async () => {
        const gatewayPort = 5001;
        const apiPort = 9002;
        let ipfsController: IPFSController = await startIPFS(gatewayPort, apiPort);
        expect(ipfsController.gatewayPort).toEqual(gatewayPort);
        expect(ipfsController.apiPort).toEqual(apiPort);
        jest.setTimeout(120000);
        let swarm = await ipfsController.api(`/swarm/peers`);
        expect(swarm.Peers.length).toBeGreaterThan(0);
        expect(await stopIPFS(5001)).toBe(true);
    })
});
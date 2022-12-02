import { execSync } from "child_process";

/* TODO
- https://docs.ipfs.tech/how-to/command-line-quick-start/
- Start IPFS service using `child_process`
- Set environment variable: `export IPFS_PATH="{pwd}/go-ipfs"` (or wherever)
- run `ipfs init`
- Import keys using custom IPFS format
- Add / remove pins
- Add / remove peers
*/
let ipfsd;
export const startIPFS = async (): Promise<any> => {

}
export const stopIPFS = async () => {
    if (ipfsd) {
    } else {
        throw Error("IPFS Daemon has not been initialized.");
    }

}
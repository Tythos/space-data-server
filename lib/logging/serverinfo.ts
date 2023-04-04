import { IPFSUtilities, keyName } from "../../lib/ipfs/index";
import { writeFileSync } from "fs";
import { COMMANDS } from "../class/ipc.interface";
import { ipcRequest } from "../utility/ipc";
import { PublicKeyVerification, ipfsIDs } from "../class/publickey.interface";

export const writeServerInfo = async (additionalInfo: ipfsIDs = {}) => {
    let pK = await ipcRequest({
        command: COMMANDS["IPFS:PRIVATEKEY:RESPONSE"],
        id: performance.now(),
        payload: await IPFSUtilities.readKey(keyName, "bip39")
    });
    if (additionalInfo) {
        for (let x in additionalInfo) {
            pK[x] = additionalInfo[x];
        }
    }
    writeFileSync("./serverinfo.json", JSON.stringify(pK, null, 4));
}
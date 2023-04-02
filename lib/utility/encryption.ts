import { Ecies, decrypt, encrypt } from "@toruslabs/eccrypto";
import { Buffer } from "buffer";
import { HDNodeWallet, sha256, verifyMessage } from "ethers";

interface IEncryptedMessage {
    message: string;
    hash: string;
    signature: string;
}

export const decryptMessage = async (privateKey: string | Buffer, input: string | IEncryptedMessage, validAddresses: Array<string> = []): Promise<string> => {

    if (!Buffer.isBuffer(privateKey)) {
        privateKey = Buffer.from(privateKey.slice(2,), "hex");
    }
    let eInput: IEncryptedMessage = typeof input === "string" ? JSON.parse(input) : input;
    let { message, hash, signature } = eInput;
    let sinput = Buffer.from(message, "base64").toString();
    let vAddress = verifyMessage(hash, signature);
    console.log(sha256(Buffer.from(message)), hash)
    if (sha256(Buffer.from(message)) !== hash) {
        throw Error("Invalid Hash");
    }
    if (!~validAddresses.map(a => a.toLowerCase()).indexOf(vAddress.toLowerCase())) {
        throw Error("Invalid Signer");
    }
    let _input = JSON.parse(sinput, (key, value) => {
        if (
            typeof value === "object" &&
            value.type === "Buffer" &&
            value?.data?.length
        ) {
            return Buffer.from(value);
        } else {
            return value;
        }
    }) as Ecies;

    return (await decrypt(
        privateKey,
        _input
    )).toString();
};

export const encryptMessage = async (publicKey: string | Buffer, input: string, ethWallet: HDNodeWallet): Promise<IEncryptedMessage> => {

    if (typeof publicKey === "string") {
        publicKey = Buffer.from(publicKey.slice(2,), "hex");
    }

    let message = Buffer.from(
        JSON.stringify(
            await encrypt(publicKey, Buffer.from(input))))
        .toString("base64");
    let hash = sha256(Buffer.from(message));
    let signature = ethWallet.signMessageSync(hash);
    return { message, hash, signature } as IEncryptedMessage;
}
import { Ecies, decrypt, encrypt } from "@toruslabs/eccrypto";
import { Buffer } from "buffer";

interface IEncryptedMessage {
    message: string;
}

export const decryptMessage = async (privateKey: string | Buffer, input: string | IEncryptedMessage): Promise<string> => {

    if (!Buffer.isBuffer(privateKey)) {
        privateKey = Buffer.from(privateKey.slice(2,), "hex");
    }
    let eInput: IEncryptedMessage = typeof input === "string" ? JSON.parse(input) : input;
    let sinput = Buffer.from(eInput.message, "base64").toString();
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

export const encryptMessage = async (publicKey: string | Buffer, input: string): Promise<IEncryptedMessage> => {

    if (typeof publicKey === "string") {
        publicKey = Buffer.from(publicKey.slice(2,), "hex");
    }

    let message = Buffer.from(
        JSON.stringify(
            await encrypt(publicKey, Buffer.from(input))))
        .toString("base64");
    return { message } as IEncryptedMessage;
}
import { decrypt } from "@toruslabs/eccrypto";
import { Buffer } from "buffer";

export const decryptMessage = async (input: any, privateKey) => {
    input = JSON.parse(input, (key, value) => {
        if (
            typeof value === "object" &&
            value.type === "Buffer" &&
            value?.data?.length
        ) {
            return Buffer.from(value);
        } else {
            return value;
        }
    });
    return await decrypt(
        Buffer.from(privateKey.slice(2), "hex"),
        input.message
    );
};
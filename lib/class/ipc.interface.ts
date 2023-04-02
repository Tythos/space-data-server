export enum COMMANDS {
    "IPFS:PUBLICKEY:REQUEST",
    "IPFS:PUBLICKEY:RESPONSE",
    "IPFS:PRIVATEKEY:REQUEST",
    "IPFS:PRIVATEKEY:RESPONSE",
    "IPFS:CHANGEKEY",
    "IPFS:CHANGEKEY:RESPONSE",
    "ETH:SIGN",
    "ETH:SIGN:RESPONSE",
    "ETH:VERIFYSIGN",
    "ETH:VERIFYSIGN:RESPONSE",
    "ETH:ENCRYPT",
    "ETH:ENCRYPT:RESPONSE",
    "ETH:DECRYPT",
    "ETH:DECRYPT:RESPONSE",
    "WORKERS:RESTART",
}

export interface IPC {
    command?: COMMANDS;
    id?: number;
    payload?: any;
    error?: string;
    [key: string]: any;
}
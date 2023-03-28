export enum COMMANDS {
    "IPFS:PUBLICKEY:REQUEST",
    "IPFS:PUBLICKEY:RESPONSE",
    "IPFS:PRIVATEKEY:REQUEST",
    "IPFS:PRIVATEKEY:RESPONSE",
    "WORKERS:RESTART"
}

export interface IPC {
    id: number;
    command: COMMANDS;
    payload?: any;
}
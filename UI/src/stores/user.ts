import { readable, writable, type Readable, type Writable } from "svelte/store";
import { providers } from "ethers";

export enum Bip32Hardened {
    NonHardened = "",
    Hardened = "'"
}

export interface Bip32PathSegment {
    value: number;
    h: Bip32Hardened;
}

export interface Bip32Path {
    purpose: Bip32PathSegment,
    cointype: Bip32PathSegment,
    account?: Bip32PathSegment,
    change?: Bip32PathSegment,
    address_index?: Bip32PathSegment
}

export const getBIP32Path = (inputPath: Bip32Path): string => {
    let b = Object.entries(inputPath);
    let x = (pathSegment) => `${pathSegment.value}${pathSegment.h}`;
    let accountPath = b
        .map((pV) => {
            return x(pV[1]);
        })
        .join("/");

    return `m/${accountPath}`;
};

export const ethWallet = writable(null);
export const hdNode = writable(null);
export const provider: Readable<any> = readable(new providers.CloudflareProvider());
export const derivationPath = writable({
    purpose: { value: 44, h: "'" as Bip32Hardened },
    cointype: { value: 60, h: "'" as Bip32Hardened },
    account: { value: 0, h: "'" as Bip32Hardened },
    change: { value: 0, h: "" as Bip32Hardened },
    address_index: { value: 0, h: "" as Bip32Hardened }
} as Bip32Path);
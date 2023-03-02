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

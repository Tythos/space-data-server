import { readable, writable, type Readable, type Writable } from "svelte/store";
import { Wallet, providers } from "ethers";
import type { Bip32Path, Bip32Hardened } from "@/lib/class/utility/BIP32";

export const ethWallet: Writable<Wallet> = writable(null);
export const hdNode = writable(null);
export const provider: Readable<any> = readable(new providers.CloudflareProvider("homestead"));
export const derivationPath = writable({
    purpose: { value: 44, h: "'" as Bip32Hardened },
    cointype: { value: 60, h: "'" as Bip32Hardened },
    account: { value: 0, h: "'" as Bip32Hardened },
    change: { value: 0, h: "" as Bip32Hardened },
    address_index: { value: 0, h: "" as Bip32Hardened }
} as Bip32Path);
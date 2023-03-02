import type { Bip32Path, Bip32Hardened } from "@/lib/class/utility/BIP32";

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

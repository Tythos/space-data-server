import { readable, writable, type Readable, type Writable, get } from "svelte/store";
import { CloudflareProvider, HDNodeWallet } from "ethers";
import type { Bip32Path, Bip32Hardened } from "@/lib/class/utility/BIP32";
import type { PersonCryptoKey } from "vcard-cryptoperson/src/class/class";
import type { Organization, Occupation } from "schema-dts";

const recalculateEthWallet = (e) => {
    let _hdWallet = get(hdWallet);

    if (!_hdWallet) return e;
    if (!get(useDefaultWallet)) {
        let _derivationPath = get(derivationPath);
        let _dPath = "m";
        let _invalid;
        for (let d in _derivationPath) {
            if (_derivationPath[d].value === null || _derivationPath[d].h === null) {
                _invalid = true;
                break;
            }
            _dPath += `/${_derivationPath[d].value}${_derivationPath[d].h}`;
        }
        if (!_invalid) {
            ethWallet.set(_hdWallet.derivePath(_dPath));
        } else {
            useDefaultWallet.set(true);
            ethWallet.set(_hdWallet);
        }
    } else {
        ethWallet.set(_hdWallet);
    }

    return e;
}
export const hdWallet: Writable<HDNodeWallet> = writable(null);
export const ethWallet: Writable<HDNodeWallet> = writable(null);
export const vCard: Writable<PersonCryptoKey> = writable({
    "@type": "Person",
    "key": [],
    familyName: "",
    givenName: "",
    honorificPrefix: "",
    honorificSuffix: "",
    additionalName: "",
    hasOccupation: {
        "@type": "Occupation",
        name: "Occupation",
    } as Occupation,
    affiliation: {
        "@type": "Organization",
        legalName: "",
        name: "",
    } as Organization,
    address: {
        "@type": "PostalAddress",
        name: "work",
        postOfficeBoxNumber: "",
        streetAddress: "Street",
        addressLocality: "City",
        addressRegion: "ST",
        addressCountry: "Country",
        postalCode: "00000",
    },
});

export const provider: Readable<any> = readable(new CloudflareProvider("homestead"));
export const useDefaultWallet: Writable<boolean> = writable(true);
export const derivationPath = writable({
    purpose: { value: 44, h: "'" as Bip32Hardened },
    cointype: { value: 60, h: "'" as Bip32Hardened },
    account: { value: 0, h: "'" as Bip32Hardened },
    change: { value: 0, h: "" as Bip32Hardened },
    address_index: { value: 0, h: "" as Bip32Hardened }
} as Bip32Path);

hdWallet.subscribe(recalculateEthWallet);
derivationPath.subscribe(recalculateEthWallet);
useDefaultWallet.subscribe(recalculateEthWallet);
import { readable, writable, type Readable, type Writable, get } from "svelte/store";
import { verifyMessage, CloudflareProvider, HDNodeWallet, SigningKey, id } from "ethers";
import type { Bip32Path, Bip32Hardened } from "@/lib/class/utility/BIP32";
import type { CryptoKeyBase, PersonCryptoKey } from "vcard-cryptoperson/src/class/class";
import type { Organization, Occupation } from "schema-dts";
import { SLIP_0044_TYPE } from "@/lib/class/utility/slip_0044";

export const getDigitalVCFSignature = (vC: any) => {
    let sVC = structuredClone(vC);
    delete sVC.signature;
    let vcString = JSON.stringify(sVC);
    console.log(vcString);
    return get(ethWallet).signingKey.sign(id(vcString));
}

export const verifyDigitalVCFSignature = (vC: PersonCryptoKey): boolean => {
    let sVC = structuredClone(vC);
    const { signature } = sVC;
    delete sVC.signature;
    let vcString = JSON.stringify(sVC);
    console.log(vcString);
    return sVC.key[0].publicKey === SigningKey.recoverPublicKey(id(vcString), signature);
}

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
    vCard.update((vC: PersonCryptoKey) => {
        vC.key[0].publicKey = _hdWallet.signingKey.publicKey;
        //vC.key[0].keyAddress = _hdWallet.address;
        return vC;
    });

    return e;
}
export const hdWallet: Writable<HDNodeWallet> = writable(null);
export const ethWallet: Writable<HDNodeWallet> = writable(null);
/*IMPORTANT: key order and completeness matter for signing serialized string*/
export const vCard: Writable<PersonCryptoKey> = writable({
    "@type": "Person",
    "key": [
        {
            "@type": "CryptoKey",
            "publicKey": "",
        }
    ],
    "hasOccupation": {
        "@type": "Occupation",
        "name": ""
    },
    "affiliation": {
        "@type": "Organization",
        "name": "",
        "legalName": ""
    },
    "address": {
        "@type": "PostalAddress",
        "postOfficeBoxNumber": "",
        "streetAddress": "",
        "addressLocality": "",
        "addressRegion": "",
        "addressCountry": "",
        "postalCode": ""
    },
    contactPoint: [
    ],
    "sameAs": "",
    "familyName": "",
    "givenName": "",
    "additionalName": "",
    "honorificPrefix": "",
    "honorificSuffix": "",
    "signature": "",
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
import type { Settings } from "@/lib/class/settings.interface";
import { writable, get } from "svelte/store";
import type { Writable } from "svelte/store";
import { _host } from "@/UI/src/stores/dev";
import { ethWallet } from "./user";
import { sha256, verifyMessage } from "ethers";
import type { PublicKeyVerification } from "@/lib/class/publickey.interface";
import { Buffer } from "buffer";
import type { HDNodeWallet } from "ethers";

export const serverEthWallet: Writable<HDNodeWallet> = writable(null);

export const kCArgs = {
    kty: "EC",
    name: "ECDSA",
    namedCurve: "K-256",
    hash: "SHA-256"
} as EcKeyGenParams;
export const getAuthHeaders = async (): Promise<HeadersInit> => {
    const authHeader = Buffer.from(
        JSON.stringify({ nonce: Date.now() })
    ).toString("base64");
    const signature = await get(ethWallet).signMessage(authHeader);
    return {
        Authorization: authHeader,
        "X-Auth-Signature": signature,
    };
}

const getJSONPath = (path) => window.location.protocol + "//" + _host + path;
export const isAdmin: Writable<boolean> = writable();
export const serverPK: Writable<PublicKeyVerification> = writable({ publicKey: "", nonce: "", nonceSignature: "" });

export async function getServerPK() {
    let _serverPK: PublicKeyVerification = (await (await fetch(getJSONPath("/publickey"))).json());
    if (_serverPK.ethAddress === verifyMessage(_serverPK.nonce, _serverPK.nonceSignature)) {
        _serverPK.publicKeyBuffer = Buffer.from(_serverPK.publicKey.slice(2,), "hex");
        serverPK.set(_serverPK);
    }
}

getServerPK();

ethWallet.subscribe(async (wallet) => {
    let adminCheck = await (await fetch(
        getJSONPath("/admin/check")
    )).json();

    if (adminCheck && wallet?.address) {
        isAdmin
            .set(!!~adminCheck.indexOf(
                sha256(wallet.address.toLowerCase()).toLowerCase())
            );
    }
});

export const cwd: Writable<string> = writable();

export const settings: Writable<Settings> = writable({
    server: {
        port: 0,
        key: "",
        cert: "",
    },
    nonceTimeout: 30000,
    data: {
        ingest: "",
        raw: "",
        fileSystemPath: "",
        useDatabase: undefined,
        cache: "",
        verbose: undefined,
    },
    cronjobs: [],
    trustedAddresses: [],
    database: {
        path: "",
        limits: {
            totalRecords: undefined,
        },
        config: {
            primary: "",
            sqlite: {
                client: "",
                connection: {
                    filename: "",
                },
                useNullAsDefault: false,
                version: "",
            },
            pg: {
                client: "",
                connection: "",
                pool: {
                    min: 0,
                    max: 0,
                },
                migrations: {
                    tableName: "",
                },
            },
        },
    },
});
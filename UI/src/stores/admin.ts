import type { Settings } from "@/lib/class/settings.interface";
import { writable, get } from "svelte/store";
import type { Writable } from "svelte/store";
import { _host } from "@/UI/src/stores/dev";
import { ethWallet } from "./user";
import { utils } from "ethers";

export const isAdmin: Writable<boolean> = writable();

ethWallet.subscribe(async (wallet) => {
    let adminCheck = await (await fetch(
        window.location.protocol + "//" + _host + "/admin/check")
    ).json();
    if (adminCheck && wallet?.address) {
        isAdmin
            .set(!!~adminCheck.indexOf(
                utils.sha256(wallet.address.toLowerCase()).toLowerCase())
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
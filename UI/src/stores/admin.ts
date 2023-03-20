import type { Settings } from "@/lib/class/settings.interface";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const cwd: Writable<string> = writable();

export const settings: Writable<Settings> = writable({
    server: {
        port: 0,
        key: "",
        cert: "",
    },
    data: {
        ingest: "",
        raw: "",
        fileSystemPath: "",
        useDatabase: undefined,
        cache: "",
        verbose: undefined,
    },
    cronjobs: [],
    trustedAddresses: undefined,
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
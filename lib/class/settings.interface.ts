import { KeyValueDataStructure } from "./utility/KeyValueDataStructure";

export interface TrustedAddress {
    address: string,
    trust: number,
    publicKey?: string,
    publicKeyBuffer?: Buffer,
    DN?: string,
    CN?: string,
    comment?: string,

}

export interface TrustedUser extends TrustedAddress {
    isAdmin?: boolean
}

interface StandardLimit {
    [key: string]: any;
}

interface cronJob {
    cron: string;
    command: string;
}

export interface Settings {
    "server": {
        "port": number,
        "key": string,
        "cert": string
    },
    "nonceTimeout": number,
    "data": {
        "ingest": string,
        "fileSystemPath": string,
        "useDatabase": Boolean,
        "cache": string,
        "verbose": Boolean,
        "defaultLimit": number,
        "limit": StandardLimit,
    },
    "cronjobs": Array<cronJob>,
    "trustedUsers": Array<TrustedAddress>,
    "trustedServers": Array<TrustedAddress>,
    "database": {
        "path": string,
        "limits": {
            totalRecords: Number
        },
        "config": {
            "primary": string,
            "sqlite": {
                "client": string,
                "connection": {
                    "filename": string
                },
                "useNullAsDefault": boolean,
                "version": string
            },
            "pg": {
                "client": string,
                "connection": string,
                "pool": {
                    "min": number,
                    "max": number
                },
                "migrations": {
                    "tableName": string
                }
            }
        }
    }
}
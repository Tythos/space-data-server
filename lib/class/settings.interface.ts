
//https://www.gnupg.org/gph/en/manual/x334.html

enum gnuTrustLevel {
    unset = 0,
    unknown = 1,
    none = 2,
    marginal = 3,
    full = 4
}

interface trustedAddress {
    DN: string,
    CN: string,
    comment: string,
    trust: gnuTrustLevel
}

interface trustedAddressMap {
    [key: string]: trustedAddress;
}

interface cronJob {
    cron: string;
    command: string;
}

export interface Settings {
    "server": {
        "port": number,
    },
    "data": {
        "ingest": string,
        "raw": string
    },
    "cronjobs": Array<cronJob>,
    "trustedAddresses": trustedAddressMap,
    "database": {
        "path": string,
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
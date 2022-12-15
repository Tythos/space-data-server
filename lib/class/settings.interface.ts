export interface Settings {
    "data": {
        "ingest": string,
        "raw": string
    },
    "trustedAddresses": Array<string>,
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
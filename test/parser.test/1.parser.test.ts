import { parseCSV } from "@/lib/ingest/parsers/celestrak/omm";
import OMMSchema from "@/lib/class/standards/OMM/main.schema.json"
import { OMMCOLLECTIONT } from "@/lib/class/standards/OMM/OMMCOLLECTION";
import * as standards from "@/lib/standards/standards";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion"
import { OMMT } from "@/lib/class/standards/OMM/OMM";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import { ethWallet, mnemonic } from "@/test/utility/generate.crypto.wallets"
import { mkdirSync, writeFileSync } from "fs";
import { config } from "@/lib/config/config";
import { describe, expect, test, beforeAll } from "@jest/globals";
import { generateDatabase, refRootName } from "@/lib/database/generateTables";
import knex from "knex";
import { utils } from "ethers";
import standardsJSON from "@/lib/standards/schemas.json";

import { JSONSchema4 } from "json-schema";

import { execSync } from "node:child_process";
import { dirname, join } from "path";
const databasePath: string = "test/output/database";

//@ts-ignore
var databaseConfig = config.database.config[config.database.config.primary];

const sqlfilename = join(dirname(databaseConfig.connection.filename), "standards.sql");

let knexConnection: any;

let standardsArray: Array<JSONSchema4> = Object.values(standardsJSON as any);

beforeAll(async () => {
    execSync(`rm -rf ${databasePath}/*.* && mkdir -p ${databasePath}`);
    knexConnection = await knex(databaseConfig);
    await generateDatabase(standardsArray, databaseConfig.connection.filename, sqlfilename, knexConnection, databaseConfig.version);
});


describe("Parse Data Into Flatbuffers", () => {
    it("should read the celestrak csv file", async () => {
        const celestrakTemplate = (format: string) => `https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=${format}`;
        const ommCSVFile: string = await fetch(celestrakTemplate("csv")).then(response => response.text());
        const ommCollection: OMMCOLLECTIONT = await parseCSV(ommCSVFile, OMMSchema);
        const ommJSON: Array<any> = await fetch(celestrakTemplate("json")).then(response => response.json());
        const standard = "OMM";
        let oFBS = writeFB(ommCollection);
        let iFBS = readFB(oFBS, standard, standards[standard]);
        let ethAddress = await ethWallet.getAddress();
        let writePath = `./${config.data.ingest}/${ethAddress}/`;
        mkdirSync(writePath, { recursive: true });
        writeFileSync(`${writePath}/${await ipfsHash.of(oFBS)}.${standard}.fbs`, oFBS);
        let resultBufferIPFSCID: string = await ipfsHash.of(oFBS);
        let signatureBufferETH: string = await ethWallet.signMessage(resultBufferIPFSCID);
        writeFileSync(`${writePath}/${await ipfsHash.of(oFBS)}.${standard}.fbs.sig`, signatureBufferETH);
        expect(JSON.stringify(ommCollection.RECORDS.map((m: OMMT) => {
            let rM: KeyValueDataStructure = {};
            for (let x in m) {
                if (ommJSON[0].hasOwnProperty(x)) {
                    rM[x] = m[x as keyof OMMT];
                }
            }
            return rM;
        }))).toEqual(JSON.stringify(ommJSON));
        expect(JSON.stringify(iFBS)).toEqual(JSON.stringify(ommCollection));
        expect(ethAddress).toEqual(utils.verifyMessage(resultBufferIPFSCID, signatureBufferETH));
    });
});
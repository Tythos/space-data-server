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
import { mkdirSync, rmdirSync, rmSync, writeFile, writeFileSync } from "fs";
import { config } from "@/lib/config/config";
import { init, deinit } from "@/lib/ingest/index";
import { exec, execSync } from "child_process";

beforeAll(async () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
})

describe("Parse Data Into Flatbuffers", () => {
    it("should read the celestrak csv file", async () => {
        rmSync(config.data.ingest, { recursive: true });
        mkdirSync(config.data.ingest, { recursive: true });
        const celestrakTemplate = (format: string) => `https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=${format}`;
        init(config.data.ingest);
        const ommCSVFile: string = await fetch(celestrakTemplate("csv")).then(response => response.text());
        let readPath = `${config.data.ingest}/celestrak.omm.test.csv`;
        let writePath = `./${config.data.ingest}/OMM/`;

        writeFileSync(`${config.data.ingest}/celestrak.omm.test.csv`, ommCSVFile);
        mkdirSync(writePath, { recursive: true });
        console.log(`node ./scripts/data_fetch/celestrak/celestrak.omm.js "${mnemonic}" ${readPath} ${writePath}`)
        let result = execSync(`node ./scripts/data_fetch/celestrak/celestrak.omm.js "${mnemonic}" ${readPath} ${writePath}`);
        console.log(result.toString());
        deinit();

    });
});
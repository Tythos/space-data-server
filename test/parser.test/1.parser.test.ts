import { parseCSV } from "@/lib/ingest/parsers/celestrak/omm";
import OMMSchema from "@/lib/class/standards/OMM/main.schema.json"
import { OMMCOLLECTIONT } from "@/lib/class/standards/OMM/OMMCOLLECTION";
import * as standards from "@/lib/standards/standards";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion"
import { OMMT } from "@/lib/class/standards/OMM/OMM";
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import { ethWallet } from "@/test/utility/generate.crypto.wallets"
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { config } from "@/lib/config/config";
import { describe } from "@jest/globals";
import { utils } from "ethers";
import { CATCOLLECTIONT } from "@/lib/class/standards/CAT/CATCOLLECTION";
import { CATT } from "@/lib/class/standards/CAT/CAT";
import { join } from "path";
import { parseVCM, VCMData } from "@/lib/parsers/vcm";

const databasePath: string = "test/output/database";
let ethAddress: string;

beforeAll(async () => {
    ethAddress = await ethWallet.getAddress();
});

describe("Parse Data Into Flatbuffers", () => {
   /* it("should read the celestrak omm csv file", async () => {
        const celestrakTemplate = (format: string) => `https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=${format}`;
        const ommCSVFile: string = await fetch(celestrakTemplate("csv")).then(response => response.text());
        const ommCollection: OMMCOLLECTIONT = await parseCSV(ommCSVFile, OMMSchema);
        const ommJSON: Array<any> = await fetch(celestrakTemplate("json")).then(response => response.json());
        const standard = "OMM";
        let oFBS = writeFB(ommCollection);
        let iFBS = readFB(oFBS, standard, standards[standard]);
        let resultBufferIPFSCID: string = await ipfsHash.of(oFBS);
        let signatureBufferETH: string = await ethWallet.signMessage(resultBufferIPFSCID);
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
    }, 50000);

    it("should read the celestrak satcat csv file", async () => {
        const catJSONFile: any = (await (await globalThis.fetch("https://celestrak.org/satcat/rsm.php?GROUP=active&FORMAT=json")).json());

        const catCollection: CATCOLLECTIONT = new CATCOLLECTIONT();
        for (let c = 0; c < catJSONFile.length; c++) {
            let newCAT = new CATT();
            let jsonCAT = catJSONFile[c];
            //@ts-ignore
            for (let prop in jsonCAT) {
                if (newCAT.hasOwnProperty(prop)) {
                    newCAT[prop] = jsonCAT[prop];
                }
            }
            catCollection.RECORDS.push(newCAT);
        }
        let catFBS = writeFB(catCollection);
        let resultcatBufferIPFSCID: string = await ipfsHash.of(catFBS);
        let signatureBufferETH: string = await ethWallet.signMessage(resultcatBufferIPFSCID);
        let checkCAT = new CATT();
        expect(JSON.stringify(catJSONFile.map(e => {
            for (let nProp in checkCAT) {
                if (!e.hasOwnProperty(nProp)) {
                    e[nProp] = checkCAT[nProp];
                }
            }
            return e;
        }))).toEqual(JSON.stringify(catCollection.RECORDS));
        expect(ethAddress).toEqual(utils.verifyMessage(resultcatBufferIPFSCID, signatureBufferETH));

    }, 50000);
*/
    it("should read a vcm file", async () => {
        const vcmString: string = readFileSync(join(__dirname, "../data/legacy/vcm/test1.vcm"), "utf-8");
        const vcmJSON: VCMData = parseVCM(vcmString);
        console.log(JSON.stringify(vcmJSON, null, 4));
    }, 50000);
});
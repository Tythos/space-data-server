import { parseCSV } from "@/lib/ingest/parsers/celestrak/omm";
import OMMSchema from "@/lib/class/standards/OMM/main.schema.json"
import { OMMCOLLECTIONT } from "@/lib/class/standards/OMM/OMMCOLLECTION";
import * as standards from "@/lib/standards/standards";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion"
import { OMMT } from "@/lib/class/standards/OMM/OMM";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { config } from "@/lib/config/config";
import { Wallet } from "ethers";

console.log(process.env);
(async () => {
    const ethWallet = Wallet.fromMnemonic(readFileSync(process.env.SEEDPHRASE as any, "utf8"));
    const ommCSVFile: string = readFileSync(process.env.OMMFILE as any, "utf8");
    const ommCollection: OMMCOLLECTIONT = await parseCSV(ommCSVFile, OMMSchema);
    const standard = "OMM";
    let oFBS = writeFB(ommCollection);
    let iFBS = readFB(oFBS, standard, standards[standard]);
    let writePath = `./${config.data.ingest}/${standard}/${await ethWallet.getAddress()}/`;
    mkdirSync(writePath, { recursive: true });
    writeFileSync(`${writePath}/${await ipfsHash.of(oFBS)}.fbs`, oFBS);
    let resultBufferIPFSCID: string = await ipfsHash.of(oFBS);
    let signatureBufferETH: string = await ethWallet.signMessage(resultBufferIPFSCID);
    writeFileSync(`${writePath}/${await ipfsHash.of(oFBS)}.fbs.sig`, signatureBufferETH);
})()
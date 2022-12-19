import { parseCSV } from "@/lib/ingest/parsers/celestrak/omm";
import OMMSchema from "@/lib/class/standards/OMM/main.schema.json"
import { OMMCOLLECTIONT } from "@/lib/class/standards/OMM/OMMCOLLECTION";
import * as standards from "@/lib/standards/standards";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion"
import { OMMT } from "@/lib/class/standards/OMM/OMM";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { Wallet } from "ethers";

(async () => {
    const [mnemonic, filePath, writePath] = process.argv.slice(-3);
    if (!mnemonic || !filePath) return;
    const ethWallet = Wallet.fromMnemonic(mnemonic);
    const ommCSVFile: string = readFileSync(filePath as any, "utf8");
    const ommCollection: OMMCOLLECTIONT = await parseCSV(ommCSVFile, OMMSchema);
    let oFBS = writeFB(ommCollection);
    mkdirSync(writePath, { recursive: true });
    writeFileSync(`${writePath}/${await ipfsHash.of(oFBS)}.fbs`, oFBS);
    let resultBufferIPFSCID: string = await ipfsHash.of(oFBS);
    let signatureBufferETH: string = await ethWallet.signMessage(resultBufferIPFSCID);
    writeFileSync(`${writePath}/${await ipfsHash.of(oFBS)}.fbs.sig`, signatureBufferETH);
})()
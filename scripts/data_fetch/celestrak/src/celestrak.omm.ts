import { parseCSV } from "@/lib/ingest/parsers/celestrak/omm";
import OMMSchema from "@/lib/class/standards/OMM/main.schema.json"
import { OMMCOLLECTIONT } from "@/lib/class/standards/OMM/OMMCOLLECTION";
import * as standards from "@/lib/standards/standards";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion"
import { OMMT } from "@/lib/class/standards/OMM/OMM";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { ethers, Wallet } from "ethers";
import { join } from "path";

(async () => {

    const [mnemonic, filePath, writePath] = process.argv.slice(-3);
    if (!mnemonic || !filePath) return;
    const ethWallet = Wallet.fromMnemonic(mnemonic);
    const ethAddress = await ethWallet.getAddress();
    const ommCSVFile: string = readFileSync(filePath as any, "utf8");
    const ommCollection: OMMCOLLECTIONT = await parseCSV(ommCSVFile, OMMSchema);
    let oFBS = writeFB(ommCollection);
    let nwritePath = join(writePath, ethAddress);
    mkdirSync(nwritePath, { recursive: true });

    let signatureFileName: string = `${nwritePath}/${await ipfsHash.of(oFBS)}.omm.fbs.sig`;
    let fileName: string = `${nwritePath}/${await ipfsHash.of(oFBS)}.omm.fbs`;

    try {
        let resultBufferIPFSCID: string = await ipfsHash.of(oFBS);
        let signatureBufferETH: string = await ethWallet.signMessage(resultBufferIPFSCID);
        let signingEthAccount = ethers.utils.verifyMessage(resultBufferIPFSCID, signatureBufferETH).toLowerCase();
        writeFileSync(`${nwritePath}/${await ipfsHash.of(oFBS)}.omm.fbs.sig`, signatureBufferETH);
        writeFileSync(`${nwritePath}/${await ipfsHash.of(oFBS)}.omm.fbs`, oFBS);
    } catch (e) {
        writeFileSync(`${nwritePath}/${await ipfsHash.of(oFBS)}.omm.fbs.error`, e);
    }

    setTimeout(() => {
        //rmSync(signatureFileName, { force: true, recursive: true });
        //rmSync(fileName, { force: true, recursive: true });
        console.log(signatureFileName, fileName);
    }, 1000);


})()
import CATSchema from "@/lib/class/standards/CAT/main.schema.json"
import { CATCOLLECTIONT } from "@/lib/class/standards/CAT/CATCOLLECTION";
import * as standards from "@/lib/standards/standards";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion"
import { CATT } from "@/lib/class/standards/CAT/CAT";
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
    const catJSONFile: string = readFileSync(filePath as any, "utf8");
    const catCollection: CATCOLLECTIONT = await JSON.parse(catJSONFile);
    let oFBS = writeFB(catCollection);
    let nwritePath = join(writePath, ethAddress);
    mkdirSync(nwritePath, { recursive: true });

    let signatureFileName: string = `${nwritePath}/${await ipfsHash.of(oFBS)}.cat.fbs.sig`;
    let fileName: string = `${nwritePath}/${await ipfsHash.of(oFBS)}.cat.fbs`;

    try {
        let resultBufferIPFSCID: string = await ipfsHash.of(oFBS);
        let signatureBufferETH: string = await ethWallet.signMessage(resultBufferIPFSCID);
        let signingEthAccount = ethers.utils.verifyMessage(resultBufferIPFSCID, signatureBufferETH).toLowerCase();
        writeFileSync(`${nwritePath}/${await ipfsHash.of(oFBS)}.cat.fbs.sig`, signatureBufferETH);
        writeFileSync(`${nwritePath}/${await ipfsHash.of(oFBS)}.cat.fbs`, oFBS);
    } catch (e) {
        writeFileSync(`${nwritePath}/${await ipfsHash.of(oFBS)}.cat.fbs.error`, e as any);
    }

    setTimeout(() => {
        //rmSync(signatureFileName, { force: true, recursive: true });
        //rmSync(fileName, { force: true, recursive: true });
        console.log(signatureFileName, fileName);
    }, 1000);


})()
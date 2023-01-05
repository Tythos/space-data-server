import { parseCSV } from "@/lib/ingest/parsers/celestrak/mpe";
import MPESchema from "@/lib/class/standards/MPE/main.schema.json";
import { MPECOLLECTIONT } from "@/lib/class/standards/MPE/MPECOLLECTION";
import * as standards from "@/lib/standards/standards";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion"
import { MPET } from "@/lib/class/standards/MPE/MPE";
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
    const mpeCSVFile: string = readFileSync(filePath as any, "utf8");
    const mpeCollection: MPECOLLECTIONT = await parseCSV(mpeCSVFile, MPESchema);
    let oFBS = writeFB(mpeCollection);
    let nwritePath = join(writePath, ethAddress);
    mkdirSync(nwritePath, { recursive: true });

    let signatureFileName: string = `${nwritePath}/${await ipfsHash.of(oFBS)}.mpe.fbs.sig`;
    let fileName: string = `${nwritePath}/${await ipfsHash.of(oFBS)}.mpe.fbs`;

    try {
        let resultBufferIPFSCID: string = await ipfsHash.of(oFBS);
        let signatureBufferETH: string = await ethWallet.signMessage(resultBufferIPFSCID);
        let signingEthAccount = ethers.utils.verifyMessage(resultBufferIPFSCID, signatureBufferETH).toLowerCase();
        writeFileSync(`${nwritePath}/${await ipfsHash.of(oFBS)}.mpe.fbs.sig`, signatureBufferETH);
        writeFileSync(`${nwritePath}/${await ipfsHash.of(oFBS)}.mpe.fbs`, oFBS);
    } catch (e) {
        writeFileSync(`${nwritePath}/${await ipfsHash.of(oFBS)}.mpe.fbs.error`, (e as unknown as string).toString());
    }

    setTimeout(() => {
        rmSync(signatureFileName, { force: true, recursive: true });
        rmSync(fileName, { force: true, recursive: true });
        console.log(signatureFileName, fileName);
    }, 1000);


})()
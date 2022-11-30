import { describe, test, beforeAll } from "@jest/globals";
import { fTCheck, refRootName, resolver } from "../lib/database/generateTables";
import { readdirSync, readFileSync, promises, writeSync } from "fs";
const { writeFile } = promises;
import zlib from "node:zlib";
const { brotliCompressSync, gzipSync } = zlib;
const standardsJSON = JSON.parse(readFileSync("./lib/standards/schemas.json", "utf-8"));
import * as standards from "../lib/standards/standards";
import { faker } from '@faker-js/faker';
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { JSONSchema4 } from "json-schema";
import { execSync } from "child_process";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import { Wallet } from "ethers";
import { networks, payments } from "bitcoinjs-lib";
import message from "bitcoinjs-message";
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { mnemonicToSeedSync } from "bip39";
const bip32 = BIP32Factory(ecc);
const fDT: any = faker.datatype;

const { p2pkh } = payments;

const dataPath: string = "test/output/data";
const mnemonic: string = `${Array(12).join("abandon ")}about`;
const ethWallet: Wallet = Wallet.fromMnemonic(mnemonic);
const btcNode: any = bip32.fromSeed(mnemonicToSeedSync(mnemonic));
const btcWallet: any = btcNode.derivePath("84'/0'/0'/1");
const { address: btcAddress } = p2pkh({
    pubkey: btcWallet.publicKey,
    network: networks.bitcoin,
});

let total = 1_00;

if (total > 10) {
    jest.setTimeout(total * 100);
}

beforeAll(async () => {
    execSync(`rm -rf ${dataPath}/*.* && mkdir -p ${dataPath}`);
});

describe('Test Data Entry', () => {
    const buildProp = (prop: any, propName: string) => {
        let { type, minimum: min, maximum: max } = (prop);
        let fakerValue: any = null;

        if (type === "integer") {
            fakerValue = fDT.number({ min, max })
        } else if (type === "number") {
            fakerValue = fDT.float();
        } else if (type === "boolean") {
            fakerValue = fDT.boolean();
        } else if (type === "string") {
            if (prop.enum) {
                fakerValue = fDT.number({ min: 0, max: prop.enum.length - 1 });
            } else if (
                ~propName.indexOf("_DATE") ||
                ~propName.indexOf("EPOCH") ||
                propName.indexOf("TIME") > 0 ||
                ~propName.indexOf("TCA")
            ) {
                fakerValue = fDT.datetime().toISOString();
            } else if (~propName.indexOf("ORIGINATOR") || ~propName.indexOf("MESSAGE_FOR")) {
                fakerValue = faker.company.name();
            } else if (~propName.indexOf("REF_FRAME")) {
                faker.helpers.arrayElement(["ICRF",
                    "ITRF-93",
                    "ITRF-97",
                    "ITRF2000",
                    "TOD",
                    "EME2000",
                    "TDR",
                    "GRC"]);
            } else {
                fakerValue = faker.datatype.string();
            }
        }
        return fakerValue;
    }

    const buildObject = (classProperties: KeyValueDataStructure, parentClass: any, tableName: string, jsonSchema: JSONSchema4) => {

        let newObject = new parentClass[`${tableName}T`];

        for (let x in classProperties) {
            let resolvedProp: any = resolver(classProperties[x]?.items || classProperties[x], jsonSchema);
            if (!fTCheck(resolvedProp?.type)) {
                newObject[x] = buildProp(resolvedProp, x);
            } else if (resolvedProp?.type === "object" && classProperties[x]?.type !== "array") {
                newObject[x] = buildObject(resolvedProp.properties, parentClass, refRootName(resolvedProp.$$ref), jsonSchema);
            } else if (classProperties[x]?.type === "array") {
                newObject[x] = [];
                for (let i = 0; i < 2; i++) {
                    let aObject = !fTCheck(resolvedProp?.type) ?
                        buildProp(resolvedProp, x) :
                        buildObject(
                            resolvedProp?.items || resolvedProp.properties,
                            parentClass,
                            refRootName(resolvedProp.$$ref),
                            jsonSchema);
                    newObject[x].push(aObject);
                }
            }
        }

        return newObject;

    }

    test('Enter Data For Each Data Type', async () => {
        let standard: keyof typeof standards

        let outputPaths: any = [
            [`${dataPath}/address.eth`, ethWallet.address],
            [`${dataPath}/address.btc`, btcAddress!]
        ];

        for (standard in standards) {
            let currentStandard = standardsJSON[standard];
            let tableName = refRootName(currentStandard.$ref);
            let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
            let parentClass: any = standards[pClassName];
            let cClassName: keyof typeof parentClass = `${tableName}COLLECTIONT`;
            let input = new parentClass[cClassName];

            for (let i = 0; i < total; i++) {
                let newObject = buildObject(currentStandard.definitions[tableName].properties, parentClass, tableName, currentStandard);
                input.RECORDS.push(newObject);
            }

            let resultBuffer: Buffer = writeFB(input);
            let resultJSON: string = JSON.stringify(input, null, 4);

            let resultBufferIPFSCID: string = await ipfsHash.of(resultBuffer);
            let resultJSONIPFSCID: string = await ipfsHash.of(resultJSON);

            let signatureBufferETH: string = await ethWallet.signMessage(resultBufferIPFSCID);
            let signatureJSONETH: string = await ethWallet.signMessage(resultJSONIPFSCID);
            let signatureBufferBTC: string = message.sign(resultBufferIPFSCID, btcWallet.privateKey, btcWallet.compressed).toString("base64");
            let signatureJSONBTC: string = message.sign(resultJSONIPFSCID, btcWallet.privateKey, btcWallet.compressed).toString("base64");

            let outputPath = `${dataPath}/${standard}`;

            //Use the two most supported compression protocols for testing
            let gzipData = {
                buffer: gzipSync(resultBuffer),
                json: gzipSync(resultJSON),
            };

            let brotliData = {
                buffer: brotliCompressSync(resultBuffer),
                json: brotliCompressSync(resultJSON)
            };

            //Size Report
            await outputPaths.push([`${outputPath}.report.txt`, `
            ${standard} buffer gzip size: ${gzipData.buffer.length / 1000} kB
            ${standard} json gzip size: ${gzipData.json.length / 1000} kB
            ${standard} buffer brotli size: ${brotliData.buffer.length / 1000} kB
            ${standard} json brotli size: ${brotliData.json.length / 1000} kB
            `]);

            outputPaths = outputPaths.concat([
                //Flatbuffer
                [`${outputPath}.input.fbs`, resultBuffer],
                [`${outputPath}.input.fbs.gz`, gzipData.buffer],
                [`${outputPath}.input.fbs.br`, brotliData.buffer],
                [`${outputPath}.input.fbs.eth.sig`, signatureBufferETH],
                [`${outputPath}.input.fbs.btc.sig`, signatureBufferBTC],
                [`${outputPath}.input.fbs.ipfs.cid.txt`, resultBufferIPFSCID],
                //JSON
                [`${outputPath}.input.json`, resultJSON],
                [`${outputPath}.input.json.gz`, gzipData.json],
                [`${outputPath}.input.json.br`, brotliData.json],
                [`${outputPath}.input.json.eth.sig`, signatureJSONETH],
                [`${outputPath}.input.json.btc.sig`, signatureJSONBTC],
                [`${outputPath}.input.json.ipfs.cid.txt`, resultJSONIPFSCID]
            ]);
        }

        //Write files to disk
        for (let oP = 0; oP < outputPaths.length; oP++) {
            let wpath = outputPaths[oP][0];
            let wcontent = outputPaths[oP][1];
            await writeFile(wpath, wcontent);
        };

        //Expect all files to be present
        expect(outputPaths.map((oP: any) => { return oP[0].replace(dataPath + "/", "") }).sort()
        ).toEqual(readdirSync(`${dataPath}/`).filter(f => f !== ".gitignore").sort());

        //Expect deserialized flatbuffers to exactly equal the JSON representation, input flatbuffer to equal output
        for (let standard in standards) {
            let currentStandard = standardsJSON[standard];
            let tableName = refRootName(currentStandard.$ref);
            let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
            let parentClass: any = standards[pClassName];
            let jsonStringInput = readFileSync(`${dataPath}/${standard}.input.json`, 'utf8');
            let flatBufferInput: Buffer = readFileSync(`${dataPath}/${tableName}.input.fbs`);
            let flatBufferObject = readFB(flatBufferInput, tableName, parentClass);
            let flatBufferOutput: Buffer = writeFB(flatBufferObject);

            expect(JSON.stringify(flatBufferObject, null, 4)).toStrictEqual(jsonStringInput);

            expect(flatBufferInput).toEqual(flatBufferOutput);
        }


    })
});
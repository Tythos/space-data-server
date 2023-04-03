import { fTCheck, refRootName, resolver } from "@/lib/database/generateTables";
import { promises, writeFileSync } from "fs";
const { writeFile } = promises;
import zlib from "node:zlib";
const { brotliCompressSync, gzipSync } = zlib;
import _standardsJSON from "@/lib/standards/schemas.json";
import * as standards from "@/lib/standards/standards";
import { faker } from '@faker-js/faker';
import { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
import { JSONSchema4 } from "json-schema";
import { execSync } from "child_process";
import { readFB, writeFB } from "@/lib/utility/flatbufferConversion";
import message from "bitcoinjs-message";
//@ts-ignore
import ipfsHash from "pure-ipfs-only-hash";
import { ethWallet, btcWallet, btcAddress } from "@/test/utility/generate.crypto.wallets";
import { join } from "path";

const fDT: any = faker.datatype;
const standardsJSON: any = _standardsJSON;

export const generateData = async (total: number = 10, numFiles: number = 5, dataPath: string = `test/output/data`, standardsToGenerate: Array<string> = Object.keys(standards)) => {
    if (!dataPath) return [];
    execSync(`rm -rf ${dataPath}/*.* && mkdir -p ${dataPath}`);

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
    for (let i = 0; i < numFiles; i++) {
        for (let standard in standards) {
            let currentStandard = standardsJSON[standard];
            let tableName = refRootName(currentStandard.$ref);
            let pClassName: keyof typeof standards = `${tableName}` as unknown as any;
            let parentClass: any = standards[pClassName];
            let cClassName: keyof typeof parentClass = `${tableName}COLLECTIONT`;
            let input = new parentClass[cClassName];

            if (!~standardsToGenerate.indexOf(standard)) continue;

            for (let i = 0; i < total; i++) {
                let newObject = buildObject(currentStandard.definitions[tableName].properties, parentClass, tableName, currentStandard);
                input.RECORDS.push(newObject);
            }

            let resultBuffer: Buffer = writeFB(input);
            let CID: string = await ipfsHash.of(resultBuffer);

            writeFileSync(join(dataPath, `${CID}.${standard.toLowerCase()}.fbs`), resultBuffer);
        };
    }
}
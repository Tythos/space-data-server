import { parse as csvparse } from 'csv-parse/sync';
import { MPECOLLECTIONT } from '@/lib/class/standards/MPE/MPECOLLECTION';
import { MPET } from '@/lib/class/standards/MPE/MPE';
import { KeyValueDataStructure } from '@/lib/class/utility/KeyValueDataStructure';
const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format
import scalarTypes from "@/lib/ingest/lib/flatbuffer.scalartypes";

const numCheck = (schema: any, pkey: string, pval: any) => {
    let sD = schema.properties[pkey];
    let pF = parseFloat(pval);
    let isZero = pF === 0;
    return ~scalarTypes.indexOf(schema.properties[pkey].type) || useAsNumber.indexOf(sD?.$ref) > -1 ? isZero ? pF : pF || null : pval ?? null;
};

export const parseCSV = async (input: any, schema: any): Promise<MPECOLLECTIONT> => {
    let resultsMPECOLLECTION: MPECOLLECTIONT = new MPECOLLECTIONT;
    let intermediateResults: any = (await csvparse(input, {
        columns: true,
        skip_empty_lines: true
    }));

    for (let row of intermediateResults) {
        let newMPE: KeyValueDataStructure = new MPET();

        newMPE.ENTITY_ID = "0x" + (parseInt(row.NORAD_CAT_ID)).toString(16);
        newMPE.USER_DEFINED_EPOCH_TIMESTAMP = new Date(row.EPOCH).getTime() + (row.EPOCH.slice(-3)) / 1000;
        for (let prop in row) {
            if (newMPE.hasOwnProperty(prop)) {
                newMPE[prop] = numCheck(schema.definitions.MPE, prop, row[prop]);
            }
        }
        resultsMPECOLLECTION.RECORDS.push(newMPE as MPET);
    };
    return resultsMPECOLLECTION;
};
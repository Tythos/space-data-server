import { parse as csvparse } from 'csv-parse/sync';
import { OMMCOLLECTIONT } from '@/lib/class/standards/OMM/OMMCOLLECTION';
import { OMMT } from '@/lib/class/standards/OMM/OMM';
import { KeyValueDataStructure } from '@/lib/class/utility/KeyValueDataStructure';
const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format
import scalarTypes from "../../lib/flatbuffer.scalartypes";

const numCheck = (schema: any, pkey: string, pval: any) => {
    let sD = schema.properties[pkey];
    let pF = parseFloat(pval);
    let isZero = pF === 0;
    return ~scalarTypes.indexOf(schema.properties[pkey].type) || useAsNumber.indexOf(sD?.$ref) > -1 ? isZero ? pF : pF || null : pval ?? null;
};

export const parseCSV = async (input: any, schema: any): Promise<OMMCOLLECTIONT> => {
    let resultsOMMCOLLECTION: OMMCOLLECTIONT = new OMMCOLLECTIONT;
    let intermediateResults: any = (await csvparse(input, {
        columns: true,
        skip_empty_lines: true
    }));

    for (let row of intermediateResults) {
        let newOMM: KeyValueDataStructure = new OMMT();
        for (let prop in row) {
            if (newOMM.hasOwnProperty(prop)) {
                newOMM[prop] = numCheck(schema.definitions.OMM, prop, row[prop]);
            }
        }
        resultsOMMCOLLECTION.RECORDS.push(newOMM as OMMT);
    };
    return resultsOMMCOLLECTION;
};
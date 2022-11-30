//@ts-ignore
import * as flatbuffers from "flatbuffers";
import { KeyValueDataStructure } from "../class/utility/KeyValueDataStructure";

export const writeFB = (standard: any): Buffer => {
    const flatBufferBuilder = new flatbuffers.Builder(1);
    let packed = standard.pack(flatBufferBuilder);
    flatBufferBuilder.finish(packed);
    return Buffer.from(flatBufferBuilder.asUint8Array());
}

export const readFB = (fbs: any, tableName: any, parentClass: KeyValueDataStructure) => {
    let input = new parentClass[`${tableName}COLLECTIONT`];
    parentClass[`${tableName}COLLECTION`][`getRootAs${tableName}COLLECTION`](
        new flatbuffers.ByteBuffer(fbs)).unpackTo(input);
    return input;
}
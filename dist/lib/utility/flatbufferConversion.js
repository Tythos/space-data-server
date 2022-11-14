//@ts-ignore
import * as flatbuffers from "flatbuffers";
export const writeFB = (standard) => {
    const flatBufferBuilder = new flatbuffers.Builder(1);
    let packed = standard.pack(flatBufferBuilder);
    flatBufferBuilder.finish(packed);
    return flatBufferBuilder.asUint8Array();
};
export const readFB = (fbs, tableName, parentClass) => {
    let input = new parentClass[`${tableName}COLLECTIONT`];
    parentClass[`${tableName}COLLECTION`][`getRootAs${tableName}COLLECTION`](new flatbuffers.ByteBuffer(fbs)).unpackTo(input);
    return input;
};

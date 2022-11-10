//@ts-ignore
import * as flatbuffers from "flatbuffers";

export default (standard: any) => {
    const flatBufferBuilder = new flatbuffers.Builder(1);
    let packed = standard.pack(flatBufferBuilder);
    flatBufferBuilder.finish(packed);
    return flatBufferBuilder.asUint8Array();
}
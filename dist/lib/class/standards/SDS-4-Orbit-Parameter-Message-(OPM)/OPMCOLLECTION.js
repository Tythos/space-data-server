// automatically generated by the FlatBuffers compiler, do not modify
import * as flatbuffers from 'flatbuffers';
import { OPM } from './OPM';
export class OPMCOLLECTION {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsOPMCOLLECTION(bb, obj) {
        return (obj || new OPMCOLLECTION()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsOPMCOLLECTION(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new OPMCOLLECTION()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    RECORDS(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? (obj || new OPM()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    RECORDSLength() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    static startOPMCOLLECTION(builder) {
        builder.startObject(1);
    }
    static addRECORDS(builder, RECORDSOffset) {
        builder.addFieldOffset(0, RECORDSOffset, 0);
    }
    static createRECORDSVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startRECORDSVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static endOPMCOLLECTION(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createOPMCOLLECTION(builder, RECORDSOffset) {
        OPMCOLLECTION.startOPMCOLLECTION(builder);
        OPMCOLLECTION.addRECORDS(builder, RECORDSOffset);
        return OPMCOLLECTION.endOPMCOLLECTION(builder);
    }
    unpack() {
        return new OPMCOLLECTIONT(this.bb.createObjList(this.RECORDS.bind(this), this.RECORDSLength()));
    }
    unpackTo(_o) {
        _o.RECORDS = this.bb.createObjList(this.RECORDS.bind(this), this.RECORDSLength());
    }
}
export class OPMCOLLECTIONT {
    RECORDS;
    constructor(RECORDS = []) {
        this.RECORDS = RECORDS;
    }
    pack(builder) {
        const RECORDS = OPMCOLLECTION.createRECORDSVector(builder, builder.createObjectOffsetList(this.RECORDS));
        return OPMCOLLECTION.createOPMCOLLECTION(builder, RECORDS);
    }
}

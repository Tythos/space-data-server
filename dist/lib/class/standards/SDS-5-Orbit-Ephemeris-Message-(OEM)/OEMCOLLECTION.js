// automatically generated by the FlatBuffers compiler, do not modify
import * as flatbuffers from 'flatbuffers';
import { OEM } from './OEM';
export class OEMCOLLECTION {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsOEMCOLLECTION(bb, obj) {
        return (obj || new OEMCOLLECTION()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsOEMCOLLECTION(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new OEMCOLLECTION()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    RECORDS(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? (obj || new OEM()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    RECORDSLength() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    static startOEMCOLLECTION(builder) {
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
    static endOEMCOLLECTION(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createOEMCOLLECTION(builder, RECORDSOffset) {
        OEMCOLLECTION.startOEMCOLLECTION(builder);
        OEMCOLLECTION.addRECORDS(builder, RECORDSOffset);
        return OEMCOLLECTION.endOEMCOLLECTION(builder);
    }
    unpack() {
        return new OEMCOLLECTIONT(this.bb.createObjList(this.RECORDS.bind(this), this.RECORDSLength()));
    }
    unpackTo(_o) {
        _o.RECORDS = this.bb.createObjList(this.RECORDS.bind(this), this.RECORDSLength());
    }
}
export class OEMCOLLECTIONT {
    RECORDS;
    constructor(RECORDS = []) {
        this.RECORDS = RECORDS;
    }
    pack(builder) {
        const RECORDS = OEMCOLLECTION.createRECORDSVector(builder, builder.createObjectOffsetList(this.RECORDS));
        return OEMCOLLECTION.createOEMCOLLECTION(builder, RECORDS);
    }
}

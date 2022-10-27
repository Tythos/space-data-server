// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { CAT, CATT } from './CAT';


export class CATCOLLECTION {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):CATCOLLECTION {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsCATCOLLECTION(bb:flatbuffers.ByteBuffer, obj?:CATCOLLECTION):CATCOLLECTION {
  return (obj || new CATCOLLECTION()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsCATCOLLECTION(bb:flatbuffers.ByteBuffer, obj?:CATCOLLECTION):CATCOLLECTION {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new CATCOLLECTION()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

RECORDS(index: number, obj?:CAT):CAT|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new CAT()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

RECORDSLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startCATCOLLECTION(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addRECORDS(builder:flatbuffers.Builder, RECORDSOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, RECORDSOffset, 0);
}

static createRECORDSVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startRECORDSVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endCATCOLLECTION(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createCATCOLLECTION(builder:flatbuffers.Builder, RECORDSOffset:flatbuffers.Offset):flatbuffers.Offset {
  CATCOLLECTION.startCATCOLLECTION(builder);
  CATCOLLECTION.addRECORDS(builder, RECORDSOffset);
  return CATCOLLECTION.endCATCOLLECTION(builder);
}

unpack(): CATCOLLECTIONT {
  return new CATCOLLECTIONT(
    this.bb!.createObjList(this.RECORDS.bind(this), this.RECORDSLength())
  );
}


unpackTo(_o: CATCOLLECTIONT): void {
  _o.RECORDS = this.bb!.createObjList(this.RECORDS.bind(this), this.RECORDSLength());
}
}

export class CATCOLLECTIONT {
constructor(
  public RECORDS: (CATT)[] = []
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const RECORDS = CATCOLLECTION.createRECORDSVector(builder, builder.createObjectOffsetList(this.RECORDS));

  return CATCOLLECTION.createCATCOLLECTION(builder,
    RECORDS
  );
}
}

// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { ephemerisDataBlock, ephemerisDataBlockT } from './ephemerisDataBlock';


export class OEM {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):OEM {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsOEM(bb:flatbuffers.ByteBuffer, obj?:OEM):OEM {
  return (obj || new OEM()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsOEM(bb:flatbuffers.ByteBuffer, obj?:OEM):OEM {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new OEM()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static bufferHasIdentifier(bb:flatbuffers.ByteBuffer):boolean {
  return bb.__has_identifier('$OEM');
}

CCSDS_OEM_VERS():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

CREATION_DATE():string|null
CREATION_DATE(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
CREATION_DATE(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

ORIGINATOR():string|null
ORIGINATOR(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
ORIGINATOR(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

EPHEMERIS_DATA_BLOCK(index: number, obj?:ephemerisDataBlock):ephemerisDataBlock|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? (obj || new ephemerisDataBlock()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

EPHEMERIS_DATA_BLOCKLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startOEM(builder:flatbuffers.Builder) {
  builder.startObject(4);
}

static addCCSDS_OEM_VERS(builder:flatbuffers.Builder, CCSDS_OEM_VERS:number) {
  builder.addFieldFloat64(0, CCSDS_OEM_VERS, 0.0);
}

static addCREATION_DATE(builder:flatbuffers.Builder, CREATION_DATEOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, CREATION_DATEOffset, 0);
}

static addORIGINATOR(builder:flatbuffers.Builder, ORIGINATOROffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, ORIGINATOROffset, 0);
}

static addEPHEMERIS_DATA_BLOCK(builder:flatbuffers.Builder, EPHEMERIS_DATA_BLOCKOffset:flatbuffers.Offset) {
  builder.addFieldOffset(3, EPHEMERIS_DATA_BLOCKOffset, 0);
}

static createEPHEMERIS_DATA_BLOCKVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startEPHEMERIS_DATA_BLOCKVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endOEM(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static finishOEMBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, '$OEM');
}

static finishSizePrefixedOEMBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, '$OEM', true);
}

static createOEM(builder:flatbuffers.Builder, CCSDS_OEM_VERS:number, CREATION_DATEOffset:flatbuffers.Offset, ORIGINATOROffset:flatbuffers.Offset, EPHEMERIS_DATA_BLOCKOffset:flatbuffers.Offset):flatbuffers.Offset {
  OEM.startOEM(builder);
  OEM.addCCSDS_OEM_VERS(builder, CCSDS_OEM_VERS);
  OEM.addCREATION_DATE(builder, CREATION_DATEOffset);
  OEM.addORIGINATOR(builder, ORIGINATOROffset);
  OEM.addEPHEMERIS_DATA_BLOCK(builder, EPHEMERIS_DATA_BLOCKOffset);
  return OEM.endOEM(builder);
}

unpack(): OEMT {
  return new OEMT(
    this.CCSDS_OEM_VERS(),
    this.CREATION_DATE(),
    this.ORIGINATOR(),
    this.bb!.createObjList(this.EPHEMERIS_DATA_BLOCK.bind(this), this.EPHEMERIS_DATA_BLOCKLength())
  );
}


unpackTo(_o: OEMT): void {
  _o.CCSDS_OEM_VERS = this.CCSDS_OEM_VERS();
  _o.CREATION_DATE = this.CREATION_DATE();
  _o.ORIGINATOR = this.ORIGINATOR();
  _o.EPHEMERIS_DATA_BLOCK = this.bb!.createObjList(this.EPHEMERIS_DATA_BLOCK.bind(this), this.EPHEMERIS_DATA_BLOCKLength());
}
}

export class OEMT {
constructor(
  public CCSDS_OEM_VERS: number = 0.0,
  public CREATION_DATE: string|Uint8Array|null = null,
  public ORIGINATOR: string|Uint8Array|null = null,
  public EPHEMERIS_DATA_BLOCK: (ephemerisDataBlockT)[] = []
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const CREATION_DATE = (this.CREATION_DATE !== null ? builder.createString(this.CREATION_DATE!) : 0);
  const ORIGINATOR = (this.ORIGINATOR !== null ? builder.createString(this.ORIGINATOR!) : 0);
  const EPHEMERIS_DATA_BLOCK = OEM.createEPHEMERIS_DATA_BLOCKVector(builder, builder.createObjectOffsetList(this.EPHEMERIS_DATA_BLOCK));

  return OEM.createOEM(builder,
    this.CCSDS_OEM_VERS,
    CREATION_DATE,
    ORIGINATOR,
    EPHEMERIS_DATA_BLOCK
  );
}
}
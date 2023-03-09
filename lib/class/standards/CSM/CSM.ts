// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class CSM implements flatbuffers.IUnpackableObject<CSMT> {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):CSM {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsCSM(bb:flatbuffers.ByteBuffer, obj?:CSM):CSM {
  return (obj || new CSM()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsCSM(bb:flatbuffers.ByteBuffer, obj?:CSM):CSM {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new CSM()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static bufferHasIdentifier(bb:flatbuffers.ByteBuffer):boolean {
  return bb.__has_identifier('$CSM');
}

OBJECT_ID_1():string|null
OBJECT_ID_1(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
OBJECT_ID_1(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

OBJECT_NAME_1():string|null
OBJECT_NAME_1(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
OBJECT_NAME_1(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

DSE_1():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

OBJECT_ID_2():string|null
OBJECT_ID_2(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
OBJECT_ID_2(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

OBJECT_NAME_2():string|null
OBJECT_NAME_2(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
OBJECT_NAME_2(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

DSE_2():number {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

TCA():number {
  const offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

TCA_RANGE():number {
  const offset = this.bb!.__offset(this.bb_pos, 18);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

TCA_RELATIVE_SPEED():number {
  const offset = this.bb!.__offset(this.bb_pos, 20);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

MIN_RANGE():number {
  const offset = this.bb!.__offset(this.bb_pos, 22);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

MAX_PROB():number {
  const offset = this.bb!.__offset(this.bb_pos, 24);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

DILUTION():number {
  const offset = this.bb!.__offset(this.bb_pos, 26);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

static startCSM(builder:flatbuffers.Builder) {
  builder.startObject(12);
}

static addObjectId1(builder:flatbuffers.Builder, OBJECT_ID_1Offset:flatbuffers.Offset) {
  builder.addFieldOffset(0, OBJECT_ID_1Offset, 0);
}

static addObjectName1(builder:flatbuffers.Builder, OBJECT_NAME_1Offset:flatbuffers.Offset) {
  builder.addFieldOffset(1, OBJECT_NAME_1Offset, 0);
}

static addDse1(builder:flatbuffers.Builder, DSE_1:number) {
  builder.addFieldFloat64(2, DSE_1, 0.0);
}

static addObjectId2(builder:flatbuffers.Builder, OBJECT_ID_2Offset:flatbuffers.Offset) {
  builder.addFieldOffset(3, OBJECT_ID_2Offset, 0);
}

static addObjectName2(builder:flatbuffers.Builder, OBJECT_NAME_2Offset:flatbuffers.Offset) {
  builder.addFieldOffset(4, OBJECT_NAME_2Offset, 0);
}

static addDse2(builder:flatbuffers.Builder, DSE_2:number) {
  builder.addFieldFloat64(5, DSE_2, 0.0);
}

static addTca(builder:flatbuffers.Builder, TCA:number) {
  builder.addFieldFloat64(6, TCA, 0.0);
}

static addTcaRange(builder:flatbuffers.Builder, TCA_RANGE:number) {
  builder.addFieldFloat64(7, TCA_RANGE, 0.0);
}

static addTcaRelativeSpeed(builder:flatbuffers.Builder, TCA_RELATIVE_SPEED:number) {
  builder.addFieldFloat64(8, TCA_RELATIVE_SPEED, 0.0);
}

static addMinRange(builder:flatbuffers.Builder, MIN_RANGE:number) {
  builder.addFieldFloat64(9, MIN_RANGE, 0.0);
}

static addMaxProb(builder:flatbuffers.Builder, MAX_PROB:number) {
  builder.addFieldFloat64(10, MAX_PROB, 0.0);
}

static addDilution(builder:flatbuffers.Builder, DILUTION:number) {
  builder.addFieldFloat64(11, DILUTION, 0.0);
}

static endCSM(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static finishCSMBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, '$CSM');
}

static finishSizePrefixedCSMBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, '$CSM', true);
}

static createCSM(builder:flatbuffers.Builder, OBJECT_ID_1Offset:flatbuffers.Offset, OBJECT_NAME_1Offset:flatbuffers.Offset, DSE_1:number, OBJECT_ID_2Offset:flatbuffers.Offset, OBJECT_NAME_2Offset:flatbuffers.Offset, DSE_2:number, TCA:number, TCA_RANGE:number, TCA_RELATIVE_SPEED:number, MIN_RANGE:number, MAX_PROB:number, DILUTION:number):flatbuffers.Offset {
  CSM.startCSM(builder);
  CSM.addObjectId1(builder, OBJECT_ID_1Offset);
  CSM.addObjectName1(builder, OBJECT_NAME_1Offset);
  CSM.addDse1(builder, DSE_1);
  CSM.addObjectId2(builder, OBJECT_ID_2Offset);
  CSM.addObjectName2(builder, OBJECT_NAME_2Offset);
  CSM.addDse2(builder, DSE_2);
  CSM.addTca(builder, TCA);
  CSM.addTcaRange(builder, TCA_RANGE);
  CSM.addTcaRelativeSpeed(builder, TCA_RELATIVE_SPEED);
  CSM.addMinRange(builder, MIN_RANGE);
  CSM.addMaxProb(builder, MAX_PROB);
  CSM.addDilution(builder, DILUTION);
  return CSM.endCSM(builder);
}

unpack(): CSMT {
  return new CSMT(
    this.OBJECT_ID_1(),
    this.OBJECT_NAME_1(),
    this.DSE_1(),
    this.OBJECT_ID_2(),
    this.OBJECT_NAME_2(),
    this.DSE_2(),
    this.TCA(),
    this.TCA_RANGE(),
    this.TCA_RELATIVE_SPEED(),
    this.MIN_RANGE(),
    this.MAX_PROB(),
    this.DILUTION()
  );
}


unpackTo(_o: CSMT): void {
  _o.OBJECT_ID_1 = this.OBJECT_ID_1();
  _o.OBJECT_NAME_1 = this.OBJECT_NAME_1();
  _o.DSE_1 = this.DSE_1();
  _o.OBJECT_ID_2 = this.OBJECT_ID_2();
  _o.OBJECT_NAME_2 = this.OBJECT_NAME_2();
  _o.DSE_2 = this.DSE_2();
  _o.TCA = this.TCA();
  _o.TCA_RANGE = this.TCA_RANGE();
  _o.TCA_RELATIVE_SPEED = this.TCA_RELATIVE_SPEED();
  _o.MIN_RANGE = this.MIN_RANGE();
  _o.MAX_PROB = this.MAX_PROB();
  _o.DILUTION = this.DILUTION();
}
}

export class CSMT implements flatbuffers.IGeneratedObject {
constructor(
  public OBJECT_ID_1: string|Uint8Array|null = null,
  public OBJECT_NAME_1: string|Uint8Array|null = null,
  public DSE_1: number = 0.0,
  public OBJECT_ID_2: string|Uint8Array|null = null,
  public OBJECT_NAME_2: string|Uint8Array|null = null,
  public DSE_2: number = 0.0,
  public TCA: number = 0.0,
  public TCA_RANGE: number = 0.0,
  public TCA_RELATIVE_SPEED: number = 0.0,
  public MIN_RANGE: number = 0.0,
  public MAX_PROB: number = 0.0,
  public DILUTION: number = 0.0
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const OBJECT_ID_1 = (this.OBJECT_ID_1 !== null ? builder.createString(this.OBJECT_ID_1!) : 0);
  const OBJECT_NAME_1 = (this.OBJECT_NAME_1 !== null ? builder.createString(this.OBJECT_NAME_1!) : 0);
  const OBJECT_ID_2 = (this.OBJECT_ID_2 !== null ? builder.createString(this.OBJECT_ID_2!) : 0);
  const OBJECT_NAME_2 = (this.OBJECT_NAME_2 !== null ? builder.createString(this.OBJECT_NAME_2!) : 0);

  return CSM.createCSM(builder,
    OBJECT_ID_1,
    OBJECT_NAME_1,
    this.DSE_1,
    OBJECT_ID_2,
    OBJECT_NAME_2,
    this.DSE_2,
    this.TCA,
    this.TCA_RANGE,
    this.TCA_RELATIVE_SPEED,
    this.MIN_RANGE,
    this.MAX_PROB,
    this.DILUTION
  );
}
}

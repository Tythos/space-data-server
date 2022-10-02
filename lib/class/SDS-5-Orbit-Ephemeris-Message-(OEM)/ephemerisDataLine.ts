// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class ephemerisDataLine {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):ephemerisDataLine {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsephemerisDataLine(bb:flatbuffers.ByteBuffer, obj?:ephemerisDataLine):ephemerisDataLine {
  return (obj || new ephemerisDataLine()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsephemerisDataLine(bb:flatbuffers.ByteBuffer, obj?:ephemerisDataLine):ephemerisDataLine {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new ephemerisDataLine()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

EPOCH():string|null
EPOCH(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
EPOCH(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

X():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

Y():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

Z():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

X_DOT():number {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

Y_DOT():number {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

Z_DOT():number {
  const offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

X_DDOT():number {
  const offset = this.bb!.__offset(this.bb_pos, 18);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

Y_DDOT():number {
  const offset = this.bb!.__offset(this.bb_pos, 20);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

Z_DDOT():number {
  const offset = this.bb!.__offset(this.bb_pos, 22);
  return offset ? this.bb!.readFloat64(this.bb_pos + offset) : 0.0;
}

static startephemerisDataLine(builder:flatbuffers.Builder) {
  builder.startObject(10);
}

static addEPOCH(builder:flatbuffers.Builder, EPOCHOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, EPOCHOffset, 0);
}

static addX(builder:flatbuffers.Builder, X:number) {
  builder.addFieldFloat64(1, X, 0.0);
}

static addY(builder:flatbuffers.Builder, Y:number) {
  builder.addFieldFloat64(2, Y, 0.0);
}

static addZ(builder:flatbuffers.Builder, Z:number) {
  builder.addFieldFloat64(3, Z, 0.0);
}

static addX_DOT(builder:flatbuffers.Builder, X_DOT:number) {
  builder.addFieldFloat64(4, X_DOT, 0.0);
}

static addY_DOT(builder:flatbuffers.Builder, Y_DOT:number) {
  builder.addFieldFloat64(5, Y_DOT, 0.0);
}

static addZ_DOT(builder:flatbuffers.Builder, Z_DOT:number) {
  builder.addFieldFloat64(6, Z_DOT, 0.0);
}

static addX_DDOT(builder:flatbuffers.Builder, X_DDOT:number) {
  builder.addFieldFloat64(7, X_DDOT, 0.0);
}

static addY_DDOT(builder:flatbuffers.Builder, Y_DDOT:number) {
  builder.addFieldFloat64(8, Y_DDOT, 0.0);
}

static addZ_DDOT(builder:flatbuffers.Builder, Z_DDOT:number) {
  builder.addFieldFloat64(9, Z_DDOT, 0.0);
}

static endephemerisDataLine(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createephemerisDataLine(builder:flatbuffers.Builder, EPOCHOffset:flatbuffers.Offset, X:number, Y:number, Z:number, X_DOT:number, Y_DOT:number, Z_DOT:number, X_DDOT:number, Y_DDOT:number, Z_DDOT:number):flatbuffers.Offset {
  ephemerisDataLine.startephemerisDataLine(builder);
  ephemerisDataLine.addEPOCH(builder, EPOCHOffset);
  ephemerisDataLine.addX(builder, X);
  ephemerisDataLine.addY(builder, Y);
  ephemerisDataLine.addZ(builder, Z);
  ephemerisDataLine.addX_DOT(builder, X_DOT);
  ephemerisDataLine.addY_DOT(builder, Y_DOT);
  ephemerisDataLine.addZ_DOT(builder, Z_DOT);
  ephemerisDataLine.addX_DDOT(builder, X_DDOT);
  ephemerisDataLine.addY_DDOT(builder, Y_DDOT);
  ephemerisDataLine.addZ_DDOT(builder, Z_DDOT);
  return ephemerisDataLine.endephemerisDataLine(builder);
}

unpack(): ephemerisDataLineT {
  return new ephemerisDataLineT(
    this.EPOCH(),
    this.X(),
    this.Y(),
    this.Z(),
    this.X_DOT(),
    this.Y_DOT(),
    this.Z_DOT(),
    this.X_DDOT(),
    this.Y_DDOT(),
    this.Z_DDOT()
  );
}


unpackTo(_o: ephemerisDataLineT): void {
  _o.EPOCH = this.EPOCH();
  _o.X = this.X();
  _o.Y = this.Y();
  _o.Z = this.Z();
  _o.X_DOT = this.X_DOT();
  _o.Y_DOT = this.Y_DOT();
  _o.Z_DOT = this.Z_DOT();
  _o.X_DDOT = this.X_DDOT();
  _o.Y_DDOT = this.Y_DDOT();
  _o.Z_DDOT = this.Z_DDOT();
}
}

export class ephemerisDataLineT {
constructor(
  public EPOCH: string|Uint8Array|null = null,
  public X: number = 0.0,
  public Y: number = 0.0,
  public Z: number = 0.0,
  public X_DOT: number = 0.0,
  public Y_DOT: number = 0.0,
  public Z_DOT: number = 0.0,
  public X_DDOT: number = 0.0,
  public Y_DDOT: number = 0.0,
  public Z_DDOT: number = 0.0
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const EPOCH = (this.EPOCH !== null ? builder.createString(this.EPOCH!) : 0);

  return ephemerisDataLine.createephemerisDataLine(builder,
    EPOCH,
    this.X,
    this.Y,
    this.Z,
    this.X_DOT,
    this.Y_DOT,
    this.Z_DOT,
    this.X_DDOT,
    this.Y_DDOT,
    this.Z_DDOT
  );
}
}

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var TypeCheck_exports = {};
__export(TypeCheck_exports, {
  TypeCheck: () => TypeCheck,
  TypeCheckT: () => TypeCheckT
});
module.exports = __toCommonJS(TypeCheck_exports);
var flatbuffers = __toESM(require("flatbuffers"));
class TypeCheck {
  bb = null;
  bb_pos = 0;
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsTypeCheck(bb, obj) {
    return (obj || new TypeCheck()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsTypeCheck(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new TypeCheck()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  byte() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : 0;
  }
  int8() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : 0;
  }
  ubyte() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
  }
  uint8() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
  }
  bool() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
  }
  short() {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
  }
  int16() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
  }
  ushort() {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
  }
  uint16() {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
  }
  int() {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
  }
  int32() {
    const offset = this.bb.__offset(this.bb_pos, 24);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
  }
  uint() {
    const offset = this.bb.__offset(this.bb_pos, 26);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  uint32() {
    const offset = this.bb.__offset(this.bb_pos, 28);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  float() {
    const offset = this.bb.__offset(this.bb_pos, 30);
    return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0;
  }
  float32() {
    const offset = this.bb.__offset(this.bb_pos, 32);
    return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0;
  }
  long() {
    const offset = this.bb.__offset(this.bb_pos, 34);
    return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
  }
  int64() {
    const offset = this.bb.__offset(this.bb_pos, 36);
    return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
  }
  ulong() {
    const offset = this.bb.__offset(this.bb_pos, 38);
    return offset ? this.bb.readUint64(this.bb_pos + offset) : this.bb.createLong(0, 0);
  }
  uint64() {
    const offset = this.bb.__offset(this.bb_pos, 40);
    return offset ? this.bb.readUint64(this.bb_pos + offset) : this.bb.createLong(0, 0);
  }
  double() {
    const offset = this.bb.__offset(this.bb_pos, 42);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  float64() {
    const offset = this.bb.__offset(this.bb_pos, 44);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  string(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 46);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  static startTypeCheck(builder) {
    builder.startObject(22);
  }
  static addbyte(builder, byte) {
    builder.addFieldInt8(0, byte, 0);
  }
  static addint8(builder, int8) {
    builder.addFieldInt8(1, int8, 0);
  }
  static addubyte(builder, ubyte) {
    builder.addFieldInt8(2, ubyte, 0);
  }
  static adduint8(builder, uint8) {
    builder.addFieldInt8(3, uint8, 0);
  }
  static addbool(builder, bool) {
    builder.addFieldInt8(4, +bool, 0);
  }
  static addshort(builder, short) {
    builder.addFieldInt16(5, short, 0);
  }
  static addint16(builder, int16) {
    builder.addFieldInt16(6, int16, 0);
  }
  static addushort(builder, ushort) {
    builder.addFieldInt16(7, ushort, 0);
  }
  static adduint16(builder, uint16) {
    builder.addFieldInt16(8, uint16, 0);
  }
  static addint(builder, int) {
    builder.addFieldInt32(9, int, 0);
  }
  static addint32(builder, int32) {
    builder.addFieldInt32(10, int32, 0);
  }
  static adduint(builder, uint) {
    builder.addFieldInt32(11, uint, 0);
  }
  static adduint32(builder, uint32) {
    builder.addFieldInt32(12, uint32, 0);
  }
  static addfloat(builder, float) {
    builder.addFieldFloat32(13, float, 0);
  }
  static addfloat32(builder, float32) {
    builder.addFieldFloat32(14, float32, 0);
  }
  static addlong(builder, long) {
    builder.addFieldInt64(15, long, builder.createLong(0, 0));
  }
  static addint64(builder, int64) {
    builder.addFieldInt64(16, int64, builder.createLong(0, 0));
  }
  static addulong(builder, ulong) {
    builder.addFieldInt64(17, ulong, builder.createLong(0, 0));
  }
  static adduint64(builder, uint64) {
    builder.addFieldInt64(18, uint64, builder.createLong(0, 0));
  }
  static adddouble(builder, double) {
    builder.addFieldFloat64(19, double, 0);
  }
  static addfloat64(builder, float64) {
    builder.addFieldFloat64(20, float64, 0);
  }
  static addstring(builder, stringOffset) {
    builder.addFieldOffset(21, stringOffset, 0);
  }
  static endTypeCheck(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static finishTypeCheckBuffer(builder, offset) {
    builder.finish(offset);
  }
  static finishSizePrefixedTypeCheckBuffer(builder, offset) {
    builder.finish(offset, void 0, true);
  }
  static createTypeCheck(builder, byte, int8, ubyte, uint8, bool, short, int16, ushort, uint16, int, int32, uint, uint32, float, float32, long, int64, ulong, uint64, double, float64, stringOffset) {
    TypeCheck.startTypeCheck(builder);
    TypeCheck.addbyte(builder, byte);
    TypeCheck.addint8(builder, int8);
    TypeCheck.addubyte(builder, ubyte);
    TypeCheck.adduint8(builder, uint8);
    TypeCheck.addbool(builder, bool);
    TypeCheck.addshort(builder, short);
    TypeCheck.addint16(builder, int16);
    TypeCheck.addushort(builder, ushort);
    TypeCheck.adduint16(builder, uint16);
    TypeCheck.addint(builder, int);
    TypeCheck.addint32(builder, int32);
    TypeCheck.adduint(builder, uint);
    TypeCheck.adduint32(builder, uint32);
    TypeCheck.addfloat(builder, float);
    TypeCheck.addfloat32(builder, float32);
    TypeCheck.addlong(builder, long);
    TypeCheck.addint64(builder, int64);
    TypeCheck.addulong(builder, ulong);
    TypeCheck.adduint64(builder, uint64);
    TypeCheck.adddouble(builder, double);
    TypeCheck.addfloat64(builder, float64);
    TypeCheck.addstring(builder, stringOffset);
    return TypeCheck.endTypeCheck(builder);
  }
  unpack() {
    return new TypeCheckT(
      this.byte(),
      this.int8(),
      this.ubyte(),
      this.uint8(),
      this.bool(),
      this.short(),
      this.int16(),
      this.ushort(),
      this.uint16(),
      this.int(),
      this.int32(),
      this.uint(),
      this.uint32(),
      this.float(),
      this.float32(),
      this.long(),
      this.int64(),
      this.ulong(),
      this.uint64(),
      this.double(),
      this.float64(),
      this.string()
    );
  }
  unpackTo(_o) {
    _o.byte = this.byte();
    _o.int8 = this.int8();
    _o.ubyte = this.ubyte();
    _o.uint8 = this.uint8();
    _o.bool = this.bool();
    _o.short = this.short();
    _o.int16 = this.int16();
    _o.ushort = this.ushort();
    _o.uint16 = this.uint16();
    _o.int = this.int();
    _o.int32 = this.int32();
    _o.uint = this.uint();
    _o.uint32 = this.uint32();
    _o.float = this.float();
    _o.float32 = this.float32();
    _o.long = this.long();
    _o.int64 = this.int64();
    _o.ulong = this.ulong();
    _o.uint64 = this.uint64();
    _o.double = this.double();
    _o.float64 = this.float64();
    _o.string = this.string();
  }
}
class TypeCheckT {
  constructor(byte = 0, int8 = 0, ubyte = 0, uint8 = 0, bool = false, short = 0, int16 = 0, ushort = 0, uint16 = 0, int = 0, int32 = 0, uint = 0, uint32 = 0, float = 0, float32 = 0, long = flatbuffers.createLong(0, 0), int64 = flatbuffers.createLong(0, 0), ulong = flatbuffers.createLong(0, 0), uint64 = flatbuffers.createLong(0, 0), double = 0, float64 = 0, string = null) {
    this.byte = byte;
    this.int8 = int8;
    this.ubyte = ubyte;
    this.uint8 = uint8;
    this.bool = bool;
    this.short = short;
    this.int16 = int16;
    this.ushort = ushort;
    this.uint16 = uint16;
    this.int = int;
    this.int32 = int32;
    this.uint = uint;
    this.uint32 = uint32;
    this.float = float;
    this.float32 = float32;
    this.long = long;
    this.int64 = int64;
    this.ulong = ulong;
    this.uint64 = uint64;
    this.double = double;
    this.float64 = float64;
    this.string = string;
  }
  pack(builder) {
    const string = this.string !== null ? builder.createString(this.string) : 0;
    return TypeCheck.createTypeCheck(
      builder,
      this.byte,
      this.int8,
      this.ubyte,
      this.uint8,
      this.bool,
      this.short,
      this.int16,
      this.ushort,
      this.uint16,
      this.int,
      this.int32,
      this.uint,
      this.uint32,
      this.float,
      this.float32,
      this.long,
      this.int64,
      this.ulong,
      this.uint64,
      this.double,
      this.float64,
      string
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypeCheck,
  TypeCheckT
});

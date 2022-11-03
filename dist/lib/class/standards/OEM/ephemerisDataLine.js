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
var ephemerisDataLine_exports = {};
__export(ephemerisDataLine_exports, {
  ephemerisDataLine: () => ephemerisDataLine,
  ephemerisDataLineT: () => ephemerisDataLineT
});
module.exports = __toCommonJS(ephemerisDataLine_exports);
var flatbuffers = __toESM(require("flatbuffers"));
class ephemerisDataLine {
  bb = null;
  bb_pos = 0;
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsephemerisDataLine(bb, obj) {
    return (obj || new ephemerisDataLine()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsephemerisDataLine(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ephemerisDataLine()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  EPOCH(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  X() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Y() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Z() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  X_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Y_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Z_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  X_DDOT() {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Y_DDOT() {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Z_DDOT() {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  static startephemerisDataLine(builder) {
    builder.startObject(10);
  }
  static addEPOCH(builder, EPOCHOffset) {
    builder.addFieldOffset(0, EPOCHOffset, 0);
  }
  static addX(builder, X) {
    builder.addFieldFloat64(1, X, 0);
  }
  static addY(builder, Y) {
    builder.addFieldFloat64(2, Y, 0);
  }
  static addZ(builder, Z) {
    builder.addFieldFloat64(3, Z, 0);
  }
  static addX_DOT(builder, X_DOT) {
    builder.addFieldFloat64(4, X_DOT, 0);
  }
  static addY_DOT(builder, Y_DOT) {
    builder.addFieldFloat64(5, Y_DOT, 0);
  }
  static addZ_DOT(builder, Z_DOT) {
    builder.addFieldFloat64(6, Z_DOT, 0);
  }
  static addX_DDOT(builder, X_DDOT) {
    builder.addFieldFloat64(7, X_DDOT, 0);
  }
  static addY_DDOT(builder, Y_DDOT) {
    builder.addFieldFloat64(8, Y_DDOT, 0);
  }
  static addZ_DDOT(builder, Z_DDOT) {
    builder.addFieldFloat64(9, Z_DDOT, 0);
  }
  static endephemerisDataLine(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createephemerisDataLine(builder, EPOCHOffset, X, Y, Z, X_DOT, Y_DOT, Z_DOT, X_DDOT, Y_DDOT, Z_DDOT) {
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
  unpack() {
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
  unpackTo(_o) {
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
class ephemerisDataLineT {
  constructor(EPOCH = null, X = 0, Y = 0, Z = 0, X_DOT = 0, Y_DOT = 0, Z_DOT = 0, X_DDOT = 0, Y_DDOT = 0, Z_DDOT = 0) {
    this.EPOCH = EPOCH;
    this.X = X;
    this.Y = Y;
    this.Z = Z;
    this.X_DOT = X_DOT;
    this.Y_DOT = Y_DOT;
    this.Z_DOT = Z_DOT;
    this.X_DDOT = X_DDOT;
    this.Y_DDOT = Y_DDOT;
    this.Z_DDOT = Z_DDOT;
  }
  pack(builder) {
    const EPOCH = this.EPOCH !== null ? builder.createString(this.EPOCH) : 0;
    return ephemerisDataLine.createephemerisDataLine(
      builder,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ephemerisDataLine,
  ephemerisDataLineT
});
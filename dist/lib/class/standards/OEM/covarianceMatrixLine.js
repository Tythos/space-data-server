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
var covarianceMatrixLine_exports = {};
__export(covarianceMatrixLine_exports, {
  covarianceMatrixLine: () => covarianceMatrixLine,
  covarianceMatrixLineT: () => covarianceMatrixLineT
});
module.exports = __toCommonJS(covarianceMatrixLine_exports);
var flatbuffers = __toESM(require("flatbuffers"));
var import_manCovRefFrame = require("./manCovRefFrame");
class covarianceMatrixLine {
  bb = null;
  bb_pos = 0;
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAscovarianceMatrixLine(bb, obj) {
    return (obj || new covarianceMatrixLine()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAscovarianceMatrixLine(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new covarianceMatrixLine()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  EPOCH(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  COV_REF_FRAME() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_manCovRefFrame.manCovRefFrame.RSW;
  }
  CX_X() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_X() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_Y() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_X() {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_Y() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_Z() {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CX_DOT_X() {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CX_DOT_Y() {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CX_DOT_Z() {
    const offset = this.bb.__offset(this.bb_pos, 24);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CX_DOT_X_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 26);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_DOT_X() {
    const offset = this.bb.__offset(this.bb_pos, 28);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_DOT_Y() {
    const offset = this.bb.__offset(this.bb_pos, 30);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_DOT_Z() {
    const offset = this.bb.__offset(this.bb_pos, 32);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_DOT_X_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 34);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_DOT_Y_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 36);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_X() {
    const offset = this.bb.__offset(this.bb_pos, 38);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_Y() {
    const offset = this.bb.__offset(this.bb_pos, 40);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_Z() {
    const offset = this.bb.__offset(this.bb_pos, 42);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_X_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 44);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_Y_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 46);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_Z_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 48);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  static startcovarianceMatrixLine(builder) {
    builder.startObject(23);
  }
  static addEPOCH(builder, EPOCHOffset) {
    builder.addFieldOffset(0, EPOCHOffset, 0);
  }
  static addCOV_REF_FRAME(builder, COV_REF_FRAME) {
    builder.addFieldInt8(1, COV_REF_FRAME, import_manCovRefFrame.manCovRefFrame.RSW);
  }
  static addCX_X(builder, CX_X) {
    builder.addFieldFloat64(2, CX_X, 0);
  }
  static addCY_X(builder, CY_X) {
    builder.addFieldFloat64(3, CY_X, 0);
  }
  static addCY_Y(builder, CY_Y) {
    builder.addFieldFloat64(4, CY_Y, 0);
  }
  static addCZ_X(builder, CZ_X) {
    builder.addFieldFloat64(5, CZ_X, 0);
  }
  static addCZ_Y(builder, CZ_Y) {
    builder.addFieldFloat64(6, CZ_Y, 0);
  }
  static addCZ_Z(builder, CZ_Z) {
    builder.addFieldFloat64(7, CZ_Z, 0);
  }
  static addCX_DOT_X(builder, CX_DOT_X) {
    builder.addFieldFloat64(8, CX_DOT_X, 0);
  }
  static addCX_DOT_Y(builder, CX_DOT_Y) {
    builder.addFieldFloat64(9, CX_DOT_Y, 0);
  }
  static addCX_DOT_Z(builder, CX_DOT_Z) {
    builder.addFieldFloat64(10, CX_DOT_Z, 0);
  }
  static addCX_DOT_X_DOT(builder, CX_DOT_X_DOT) {
    builder.addFieldFloat64(11, CX_DOT_X_DOT, 0);
  }
  static addCY_DOT_X(builder, CY_DOT_X) {
    builder.addFieldFloat64(12, CY_DOT_X, 0);
  }
  static addCY_DOT_Y(builder, CY_DOT_Y) {
    builder.addFieldFloat64(13, CY_DOT_Y, 0);
  }
  static addCY_DOT_Z(builder, CY_DOT_Z) {
    builder.addFieldFloat64(14, CY_DOT_Z, 0);
  }
  static addCY_DOT_X_DOT(builder, CY_DOT_X_DOT) {
    builder.addFieldFloat64(15, CY_DOT_X_DOT, 0);
  }
  static addCY_DOT_Y_DOT(builder, CY_DOT_Y_DOT) {
    builder.addFieldFloat64(16, CY_DOT_Y_DOT, 0);
  }
  static addCZ_DOT_X(builder, CZ_DOT_X) {
    builder.addFieldFloat64(17, CZ_DOT_X, 0);
  }
  static addCZ_DOT_Y(builder, CZ_DOT_Y) {
    builder.addFieldFloat64(18, CZ_DOT_Y, 0);
  }
  static addCZ_DOT_Z(builder, CZ_DOT_Z) {
    builder.addFieldFloat64(19, CZ_DOT_Z, 0);
  }
  static addCZ_DOT_X_DOT(builder, CZ_DOT_X_DOT) {
    builder.addFieldFloat64(20, CZ_DOT_X_DOT, 0);
  }
  static addCZ_DOT_Y_DOT(builder, CZ_DOT_Y_DOT) {
    builder.addFieldFloat64(21, CZ_DOT_Y_DOT, 0);
  }
  static addCZ_DOT_Z_DOT(builder, CZ_DOT_Z_DOT) {
    builder.addFieldFloat64(22, CZ_DOT_Z_DOT, 0);
  }
  static endcovarianceMatrixLine(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createcovarianceMatrixLine(builder, EPOCHOffset, COV_REF_FRAME, CX_X, CY_X, CY_Y, CZ_X, CZ_Y, CZ_Z, CX_DOT_X, CX_DOT_Y, CX_DOT_Z, CX_DOT_X_DOT, CY_DOT_X, CY_DOT_Y, CY_DOT_Z, CY_DOT_X_DOT, CY_DOT_Y_DOT, CZ_DOT_X, CZ_DOT_Y, CZ_DOT_Z, CZ_DOT_X_DOT, CZ_DOT_Y_DOT, CZ_DOT_Z_DOT) {
    covarianceMatrixLine.startcovarianceMatrixLine(builder);
    covarianceMatrixLine.addEPOCH(builder, EPOCHOffset);
    covarianceMatrixLine.addCOV_REF_FRAME(builder, COV_REF_FRAME);
    covarianceMatrixLine.addCX_X(builder, CX_X);
    covarianceMatrixLine.addCY_X(builder, CY_X);
    covarianceMatrixLine.addCY_Y(builder, CY_Y);
    covarianceMatrixLine.addCZ_X(builder, CZ_X);
    covarianceMatrixLine.addCZ_Y(builder, CZ_Y);
    covarianceMatrixLine.addCZ_Z(builder, CZ_Z);
    covarianceMatrixLine.addCX_DOT_X(builder, CX_DOT_X);
    covarianceMatrixLine.addCX_DOT_Y(builder, CX_DOT_Y);
    covarianceMatrixLine.addCX_DOT_Z(builder, CX_DOT_Z);
    covarianceMatrixLine.addCX_DOT_X_DOT(builder, CX_DOT_X_DOT);
    covarianceMatrixLine.addCY_DOT_X(builder, CY_DOT_X);
    covarianceMatrixLine.addCY_DOT_Y(builder, CY_DOT_Y);
    covarianceMatrixLine.addCY_DOT_Z(builder, CY_DOT_Z);
    covarianceMatrixLine.addCY_DOT_X_DOT(builder, CY_DOT_X_DOT);
    covarianceMatrixLine.addCY_DOT_Y_DOT(builder, CY_DOT_Y_DOT);
    covarianceMatrixLine.addCZ_DOT_X(builder, CZ_DOT_X);
    covarianceMatrixLine.addCZ_DOT_Y(builder, CZ_DOT_Y);
    covarianceMatrixLine.addCZ_DOT_Z(builder, CZ_DOT_Z);
    covarianceMatrixLine.addCZ_DOT_X_DOT(builder, CZ_DOT_X_DOT);
    covarianceMatrixLine.addCZ_DOT_Y_DOT(builder, CZ_DOT_Y_DOT);
    covarianceMatrixLine.addCZ_DOT_Z_DOT(builder, CZ_DOT_Z_DOT);
    return covarianceMatrixLine.endcovarianceMatrixLine(builder);
  }
  unpack() {
    return new covarianceMatrixLineT(
      this.EPOCH(),
      this.COV_REF_FRAME(),
      this.CX_X(),
      this.CY_X(),
      this.CY_Y(),
      this.CZ_X(),
      this.CZ_Y(),
      this.CZ_Z(),
      this.CX_DOT_X(),
      this.CX_DOT_Y(),
      this.CX_DOT_Z(),
      this.CX_DOT_X_DOT(),
      this.CY_DOT_X(),
      this.CY_DOT_Y(),
      this.CY_DOT_Z(),
      this.CY_DOT_X_DOT(),
      this.CY_DOT_Y_DOT(),
      this.CZ_DOT_X(),
      this.CZ_DOT_Y(),
      this.CZ_DOT_Z(),
      this.CZ_DOT_X_DOT(),
      this.CZ_DOT_Y_DOT(),
      this.CZ_DOT_Z_DOT()
    );
  }
  unpackTo(_o) {
    _o.EPOCH = this.EPOCH();
    _o.COV_REF_FRAME = this.COV_REF_FRAME();
    _o.CX_X = this.CX_X();
    _o.CY_X = this.CY_X();
    _o.CY_Y = this.CY_Y();
    _o.CZ_X = this.CZ_X();
    _o.CZ_Y = this.CZ_Y();
    _o.CZ_Z = this.CZ_Z();
    _o.CX_DOT_X = this.CX_DOT_X();
    _o.CX_DOT_Y = this.CX_DOT_Y();
    _o.CX_DOT_Z = this.CX_DOT_Z();
    _o.CX_DOT_X_DOT = this.CX_DOT_X_DOT();
    _o.CY_DOT_X = this.CY_DOT_X();
    _o.CY_DOT_Y = this.CY_DOT_Y();
    _o.CY_DOT_Z = this.CY_DOT_Z();
    _o.CY_DOT_X_DOT = this.CY_DOT_X_DOT();
    _o.CY_DOT_Y_DOT = this.CY_DOT_Y_DOT();
    _o.CZ_DOT_X = this.CZ_DOT_X();
    _o.CZ_DOT_Y = this.CZ_DOT_Y();
    _o.CZ_DOT_Z = this.CZ_DOT_Z();
    _o.CZ_DOT_X_DOT = this.CZ_DOT_X_DOT();
    _o.CZ_DOT_Y_DOT = this.CZ_DOT_Y_DOT();
    _o.CZ_DOT_Z_DOT = this.CZ_DOT_Z_DOT();
  }
}
class covarianceMatrixLineT {
  constructor(EPOCH = null, COV_REF_FRAME = import_manCovRefFrame.manCovRefFrame.RSW, CX_X = 0, CY_X = 0, CY_Y = 0, CZ_X = 0, CZ_Y = 0, CZ_Z = 0, CX_DOT_X = 0, CX_DOT_Y = 0, CX_DOT_Z = 0, CX_DOT_X_DOT = 0, CY_DOT_X = 0, CY_DOT_Y = 0, CY_DOT_Z = 0, CY_DOT_X_DOT = 0, CY_DOT_Y_DOT = 0, CZ_DOT_X = 0, CZ_DOT_Y = 0, CZ_DOT_Z = 0, CZ_DOT_X_DOT = 0, CZ_DOT_Y_DOT = 0, CZ_DOT_Z_DOT = 0) {
    this.EPOCH = EPOCH;
    this.COV_REF_FRAME = COV_REF_FRAME;
    this.CX_X = CX_X;
    this.CY_X = CY_X;
    this.CY_Y = CY_Y;
    this.CZ_X = CZ_X;
    this.CZ_Y = CZ_Y;
    this.CZ_Z = CZ_Z;
    this.CX_DOT_X = CX_DOT_X;
    this.CX_DOT_Y = CX_DOT_Y;
    this.CX_DOT_Z = CX_DOT_Z;
    this.CX_DOT_X_DOT = CX_DOT_X_DOT;
    this.CY_DOT_X = CY_DOT_X;
    this.CY_DOT_Y = CY_DOT_Y;
    this.CY_DOT_Z = CY_DOT_Z;
    this.CY_DOT_X_DOT = CY_DOT_X_DOT;
    this.CY_DOT_Y_DOT = CY_DOT_Y_DOT;
    this.CZ_DOT_X = CZ_DOT_X;
    this.CZ_DOT_Y = CZ_DOT_Y;
    this.CZ_DOT_Z = CZ_DOT_Z;
    this.CZ_DOT_X_DOT = CZ_DOT_X_DOT;
    this.CZ_DOT_Y_DOT = CZ_DOT_Y_DOT;
    this.CZ_DOT_Z_DOT = CZ_DOT_Z_DOT;
  }
  pack(builder) {
    const EPOCH = this.EPOCH !== null ? builder.createString(this.EPOCH) : 0;
    return covarianceMatrixLine.createcovarianceMatrixLine(
      builder,
      EPOCH,
      this.COV_REF_FRAME,
      this.CX_X,
      this.CY_X,
      this.CY_Y,
      this.CZ_X,
      this.CZ_Y,
      this.CZ_Z,
      this.CX_DOT_X,
      this.CX_DOT_Y,
      this.CX_DOT_Z,
      this.CX_DOT_X_DOT,
      this.CY_DOT_X,
      this.CY_DOT_Y,
      this.CY_DOT_Z,
      this.CY_DOT_X_DOT,
      this.CY_DOT_Y_DOT,
      this.CZ_DOT_X,
      this.CZ_DOT_Y,
      this.CZ_DOT_Z,
      this.CZ_DOT_X_DOT,
      this.CZ_DOT_Y_DOT,
      this.CZ_DOT_Z_DOT
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  covarianceMatrixLine,
  covarianceMatrixLineT
});

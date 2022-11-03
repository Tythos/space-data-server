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
var ephemerisDataBlock_exports = {};
__export(ephemerisDataBlock_exports, {
  ephemerisDataBlock: () => ephemerisDataBlock,
  ephemerisDataBlockT: () => ephemerisDataBlockT
});
module.exports = __toCommonJS(ephemerisDataBlock_exports);
var flatbuffers = __toESM(require("flatbuffers"));
var import_covarianceMatrixLine = require("./covarianceMatrixLine");
var import_ephemerisDataLine = require("./ephemerisDataLine");
var import_referenceFrame = require("./referenceFrame");
var import_timeSystem = require("./timeSystem");
class ephemerisDataBlock {
  bb = null;
  bb_pos = 0;
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsephemerisDataBlock(bb, obj) {
    return (obj || new ephemerisDataBlock()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsephemerisDataBlock(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ephemerisDataBlock()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  COMMENT(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  OBJECT_NAME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  OBJECT_ID(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  CENTER_NAME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  REF_FRAME() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_referenceFrame.referenceFrame.EME2000;
  }
  REF_FRAME_EPOCH(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  TIME_SYSTEM() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_timeSystem.timeSystem.GMST;
  }
  START_TIME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  USEABLE_START_TIME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  USEABLE_STOP_TIME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  STOP_TIME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 24);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  INTERPOLATION(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 26);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  INTERPOLATION_DEGREE() {
    const offset = this.bb.__offset(this.bb_pos, 28);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  EPHEMERIS_DATA_LINES(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 30);
    return offset ? (obj || new import_ephemerisDataLine.ephemerisDataLine()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  EPHEMERIS_DATA_LINESLength() {
    const offset = this.bb.__offset(this.bb_pos, 30);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  COVARIANCE_MATRIX_LINES(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 32);
    return offset ? (obj || new import_covarianceMatrixLine.covarianceMatrixLine()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  COVARIANCE_MATRIX_LINESLength() {
    const offset = this.bb.__offset(this.bb_pos, 32);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startephemerisDataBlock(builder) {
    builder.startObject(15);
  }
  static addCOMMENT(builder, COMMENTOffset) {
    builder.addFieldOffset(0, COMMENTOffset, 0);
  }
  static addOBJECT_NAME(builder, OBJECT_NAMEOffset) {
    builder.addFieldOffset(1, OBJECT_NAMEOffset, 0);
  }
  static addOBJECT_ID(builder, OBJECT_IDOffset) {
    builder.addFieldOffset(2, OBJECT_IDOffset, 0);
  }
  static addCENTER_NAME(builder, CENTER_NAMEOffset) {
    builder.addFieldOffset(3, CENTER_NAMEOffset, 0);
  }
  static addREF_FRAME(builder, REF_FRAME) {
    builder.addFieldInt8(4, REF_FRAME, import_referenceFrame.referenceFrame.EME2000);
  }
  static addREF_FRAME_EPOCH(builder, REF_FRAME_EPOCHOffset) {
    builder.addFieldOffset(5, REF_FRAME_EPOCHOffset, 0);
  }
  static addTIME_SYSTEM(builder, TIME_SYSTEM) {
    builder.addFieldInt8(6, TIME_SYSTEM, import_timeSystem.timeSystem.GMST);
  }
  static addSTART_TIME(builder, START_TIMEOffset) {
    builder.addFieldOffset(7, START_TIMEOffset, 0);
  }
  static addUSEABLE_START_TIME(builder, USEABLE_START_TIMEOffset) {
    builder.addFieldOffset(8, USEABLE_START_TIMEOffset, 0);
  }
  static addUSEABLE_STOP_TIME(builder, USEABLE_STOP_TIMEOffset) {
    builder.addFieldOffset(9, USEABLE_STOP_TIMEOffset, 0);
  }
  static addSTOP_TIME(builder, STOP_TIMEOffset) {
    builder.addFieldOffset(10, STOP_TIMEOffset, 0);
  }
  static addINTERPOLATION(builder, INTERPOLATIONOffset) {
    builder.addFieldOffset(11, INTERPOLATIONOffset, 0);
  }
  static addINTERPOLATION_DEGREE(builder, INTERPOLATION_DEGREE) {
    builder.addFieldInt32(12, INTERPOLATION_DEGREE, 0);
  }
  static addEPHEMERIS_DATA_LINES(builder, EPHEMERIS_DATA_LINESOffset) {
    builder.addFieldOffset(13, EPHEMERIS_DATA_LINESOffset, 0);
  }
  static createEPHEMERIS_DATA_LINESVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startEPHEMERIS_DATA_LINESVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addCOVARIANCE_MATRIX_LINES(builder, COVARIANCE_MATRIX_LINESOffset) {
    builder.addFieldOffset(14, COVARIANCE_MATRIX_LINESOffset, 0);
  }
  static createCOVARIANCE_MATRIX_LINESVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startCOVARIANCE_MATRIX_LINESVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endephemerisDataBlock(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createephemerisDataBlock(builder, COMMENTOffset, OBJECT_NAMEOffset, OBJECT_IDOffset, CENTER_NAMEOffset, REF_FRAME, REF_FRAME_EPOCHOffset, TIME_SYSTEM, START_TIMEOffset, USEABLE_START_TIMEOffset, USEABLE_STOP_TIMEOffset, STOP_TIMEOffset, INTERPOLATIONOffset, INTERPOLATION_DEGREE, EPHEMERIS_DATA_LINESOffset, COVARIANCE_MATRIX_LINESOffset) {
    ephemerisDataBlock.startephemerisDataBlock(builder);
    ephemerisDataBlock.addCOMMENT(builder, COMMENTOffset);
    ephemerisDataBlock.addOBJECT_NAME(builder, OBJECT_NAMEOffset);
    ephemerisDataBlock.addOBJECT_ID(builder, OBJECT_IDOffset);
    ephemerisDataBlock.addCENTER_NAME(builder, CENTER_NAMEOffset);
    ephemerisDataBlock.addREF_FRAME(builder, REF_FRAME);
    ephemerisDataBlock.addREF_FRAME_EPOCH(builder, REF_FRAME_EPOCHOffset);
    ephemerisDataBlock.addTIME_SYSTEM(builder, TIME_SYSTEM);
    ephemerisDataBlock.addSTART_TIME(builder, START_TIMEOffset);
    ephemerisDataBlock.addUSEABLE_START_TIME(builder, USEABLE_START_TIMEOffset);
    ephemerisDataBlock.addUSEABLE_STOP_TIME(builder, USEABLE_STOP_TIMEOffset);
    ephemerisDataBlock.addSTOP_TIME(builder, STOP_TIMEOffset);
    ephemerisDataBlock.addINTERPOLATION(builder, INTERPOLATIONOffset);
    ephemerisDataBlock.addINTERPOLATION_DEGREE(builder, INTERPOLATION_DEGREE);
    ephemerisDataBlock.addEPHEMERIS_DATA_LINES(builder, EPHEMERIS_DATA_LINESOffset);
    ephemerisDataBlock.addCOVARIANCE_MATRIX_LINES(builder, COVARIANCE_MATRIX_LINESOffset);
    return ephemerisDataBlock.endephemerisDataBlock(builder);
  }
  unpack() {
    return new ephemerisDataBlockT(
      this.COMMENT(),
      this.OBJECT_NAME(),
      this.OBJECT_ID(),
      this.CENTER_NAME(),
      this.REF_FRAME(),
      this.REF_FRAME_EPOCH(),
      this.TIME_SYSTEM(),
      this.START_TIME(),
      this.USEABLE_START_TIME(),
      this.USEABLE_STOP_TIME(),
      this.STOP_TIME(),
      this.INTERPOLATION(),
      this.INTERPOLATION_DEGREE(),
      this.bb.createObjList(this.EPHEMERIS_DATA_LINES.bind(this), this.EPHEMERIS_DATA_LINESLength()),
      this.bb.createObjList(this.COVARIANCE_MATRIX_LINES.bind(this), this.COVARIANCE_MATRIX_LINESLength())
    );
  }
  unpackTo(_o) {
    _o.COMMENT = this.COMMENT();
    _o.OBJECT_NAME = this.OBJECT_NAME();
    _o.OBJECT_ID = this.OBJECT_ID();
    _o.CENTER_NAME = this.CENTER_NAME();
    _o.REF_FRAME = this.REF_FRAME();
    _o.REF_FRAME_EPOCH = this.REF_FRAME_EPOCH();
    _o.TIME_SYSTEM = this.TIME_SYSTEM();
    _o.START_TIME = this.START_TIME();
    _o.USEABLE_START_TIME = this.USEABLE_START_TIME();
    _o.USEABLE_STOP_TIME = this.USEABLE_STOP_TIME();
    _o.STOP_TIME = this.STOP_TIME();
    _o.INTERPOLATION = this.INTERPOLATION();
    _o.INTERPOLATION_DEGREE = this.INTERPOLATION_DEGREE();
    _o.EPHEMERIS_DATA_LINES = this.bb.createObjList(this.EPHEMERIS_DATA_LINES.bind(this), this.EPHEMERIS_DATA_LINESLength());
    _o.COVARIANCE_MATRIX_LINES = this.bb.createObjList(this.COVARIANCE_MATRIX_LINES.bind(this), this.COVARIANCE_MATRIX_LINESLength());
  }
}
class ephemerisDataBlockT {
  constructor(COMMENT = null, OBJECT_NAME = null, OBJECT_ID = null, CENTER_NAME = null, REF_FRAME = import_referenceFrame.referenceFrame.EME2000, REF_FRAME_EPOCH = null, TIME_SYSTEM = import_timeSystem.timeSystem.GMST, START_TIME = null, USEABLE_START_TIME = null, USEABLE_STOP_TIME = null, STOP_TIME = null, INTERPOLATION = null, INTERPOLATION_DEGREE = 0, EPHEMERIS_DATA_LINES = [], COVARIANCE_MATRIX_LINES = []) {
    this.COMMENT = COMMENT;
    this.OBJECT_NAME = OBJECT_NAME;
    this.OBJECT_ID = OBJECT_ID;
    this.CENTER_NAME = CENTER_NAME;
    this.REF_FRAME = REF_FRAME;
    this.REF_FRAME_EPOCH = REF_FRAME_EPOCH;
    this.TIME_SYSTEM = TIME_SYSTEM;
    this.START_TIME = START_TIME;
    this.USEABLE_START_TIME = USEABLE_START_TIME;
    this.USEABLE_STOP_TIME = USEABLE_STOP_TIME;
    this.STOP_TIME = STOP_TIME;
    this.INTERPOLATION = INTERPOLATION;
    this.INTERPOLATION_DEGREE = INTERPOLATION_DEGREE;
    this.EPHEMERIS_DATA_LINES = EPHEMERIS_DATA_LINES;
    this.COVARIANCE_MATRIX_LINES = COVARIANCE_MATRIX_LINES;
  }
  pack(builder) {
    const COMMENT = this.COMMENT !== null ? builder.createString(this.COMMENT) : 0;
    const OBJECT_NAME = this.OBJECT_NAME !== null ? builder.createString(this.OBJECT_NAME) : 0;
    const OBJECT_ID = this.OBJECT_ID !== null ? builder.createString(this.OBJECT_ID) : 0;
    const CENTER_NAME = this.CENTER_NAME !== null ? builder.createString(this.CENTER_NAME) : 0;
    const REF_FRAME_EPOCH = this.REF_FRAME_EPOCH !== null ? builder.createString(this.REF_FRAME_EPOCH) : 0;
    const START_TIME = this.START_TIME !== null ? builder.createString(this.START_TIME) : 0;
    const USEABLE_START_TIME = this.USEABLE_START_TIME !== null ? builder.createString(this.USEABLE_START_TIME) : 0;
    const USEABLE_STOP_TIME = this.USEABLE_STOP_TIME !== null ? builder.createString(this.USEABLE_STOP_TIME) : 0;
    const STOP_TIME = this.STOP_TIME !== null ? builder.createString(this.STOP_TIME) : 0;
    const INTERPOLATION = this.INTERPOLATION !== null ? builder.createString(this.INTERPOLATION) : 0;
    const EPHEMERIS_DATA_LINES = ephemerisDataBlock.createEPHEMERIS_DATA_LINESVector(builder, builder.createObjectOffsetList(this.EPHEMERIS_DATA_LINES));
    const COVARIANCE_MATRIX_LINES = ephemerisDataBlock.createCOVARIANCE_MATRIX_LINESVector(builder, builder.createObjectOffsetList(this.COVARIANCE_MATRIX_LINES));
    return ephemerisDataBlock.createephemerisDataBlock(
      builder,
      COMMENT,
      OBJECT_NAME,
      OBJECT_ID,
      CENTER_NAME,
      this.REF_FRAME,
      REF_FRAME_EPOCH,
      this.TIME_SYSTEM,
      START_TIME,
      USEABLE_START_TIME,
      USEABLE_STOP_TIME,
      STOP_TIME,
      INTERPOLATION,
      this.INTERPOLATION_DEGREE,
      EPHEMERIS_DATA_LINES,
      COVARIANCE_MATRIX_LINES
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ephemerisDataBlock,
  ephemerisDataBlockT
});

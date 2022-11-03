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
var OPM_exports = {};
__export(OPM_exports, {
  OPM: () => OPM,
  OPMT: () => OPMT
});
module.exports = __toCommonJS(OPM_exports);
var flatbuffers = __toESM(require("flatbuffers"));
var import_manCovRefFrame = require("./manCovRefFrame");
var import_maneuverParameters = require("./maneuverParameters");
var import_referenceFrame = require("./referenceFrame");
var import_timeSystem = require("./timeSystem");
class OPM {
  bb = null;
  bb_pos = 0;
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsOPM(bb, obj) {
    return (obj || new OPM()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsOPM(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new OPM()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static bufferHasIdentifier(bb) {
    return bb.__has_identifier("$OPM");
  }
  CCSDS_OPM_VERS() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CREATION_DATE(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  ORIGINATOR(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  OBJECT_NAME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  OBJECT_ID(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  CENTER_NAME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  REF_FRAME() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_referenceFrame.referenceFrame.EME2000;
  }
  REF_FRAME_EPOCH(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  TIME_SYSTEM() {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_timeSystem.timeSystem.GMST;
  }
  COMMENT(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  EPOCH(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 24);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  X() {
    const offset = this.bb.__offset(this.bb_pos, 26);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Y() {
    const offset = this.bb.__offset(this.bb_pos, 28);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Z() {
    const offset = this.bb.__offset(this.bb_pos, 30);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  X_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 32);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Y_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 34);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Z_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 36);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  SEMI_MAJOR_AXIS() {
    const offset = this.bb.__offset(this.bb_pos, 38);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  ECCENTRICITY() {
    const offset = this.bb.__offset(this.bb_pos, 40);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  INCLINATION() {
    const offset = this.bb.__offset(this.bb_pos, 42);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  RA_OF_ASC_NODE() {
    const offset = this.bb.__offset(this.bb_pos, 44);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  ARG_OF_PERICENTER() {
    const offset = this.bb.__offset(this.bb_pos, 46);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  TRUE_ANOMALY() {
    const offset = this.bb.__offset(this.bb_pos, 48);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  MEAN_ANOMALY() {
    const offset = this.bb.__offset(this.bb_pos, 50);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  GM() {
    const offset = this.bb.__offset(this.bb_pos, 52);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  MASS() {
    const offset = this.bb.__offset(this.bb_pos, 54);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  SOLAR_RAD_AREA() {
    const offset = this.bb.__offset(this.bb_pos, 56);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  SOLAR_RAD_COEFF() {
    const offset = this.bb.__offset(this.bb_pos, 58);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  DRAG_AREA() {
    const offset = this.bb.__offset(this.bb_pos, 60);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  DRAG_COEFF() {
    const offset = this.bb.__offset(this.bb_pos, 62);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  COV_REF_FRAME() {
    const offset = this.bb.__offset(this.bb_pos, 64);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_manCovRefFrame.manCovRefFrame.RSW;
  }
  CX_X() {
    const offset = this.bb.__offset(this.bb_pos, 66);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_X() {
    const offset = this.bb.__offset(this.bb_pos, 68);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_Y() {
    const offset = this.bb.__offset(this.bb_pos, 70);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_X() {
    const offset = this.bb.__offset(this.bb_pos, 72);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_Y() {
    const offset = this.bb.__offset(this.bb_pos, 74);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_Z() {
    const offset = this.bb.__offset(this.bb_pos, 76);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CX_DOT_X() {
    const offset = this.bb.__offset(this.bb_pos, 78);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CX_DOT_Y() {
    const offset = this.bb.__offset(this.bb_pos, 80);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CX_DOT_Z() {
    const offset = this.bb.__offset(this.bb_pos, 82);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CX_DOT_X_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 84);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_DOT_X() {
    const offset = this.bb.__offset(this.bb_pos, 86);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_DOT_Y() {
    const offset = this.bb.__offset(this.bb_pos, 88);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_DOT_Z() {
    const offset = this.bb.__offset(this.bb_pos, 90);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_DOT_X_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 92);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CY_DOT_Y_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 94);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_X() {
    const offset = this.bb.__offset(this.bb_pos, 96);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_Y() {
    const offset = this.bb.__offset(this.bb_pos, 98);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_Z() {
    const offset = this.bb.__offset(this.bb_pos, 100);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_X_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 102);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_Y_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 104);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CZ_DOT_Z_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 106);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  MANEUVERS(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 108);
    return offset ? (obj || new import_maneuverParameters.maneuverParameters()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  MANEUVERSLength() {
    const offset = this.bb.__offset(this.bb_pos, 108);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  USER_DEFINED_BIP_0044_TYPE() {
    const offset = this.bb.__offset(this.bb_pos, 110);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  USER_DEFINED_OBJECT_DESIGNATOR(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 112);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  USER_DEFINED_EARTH_MODEL(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 114);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  USER_DEFINED_EPOCH_TIMESTAMP() {
    const offset = this.bb.__offset(this.bb_pos, 116);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  USER_DEFINED_EPOCH_MICROSECONDS() {
    const offset = this.bb.__offset(this.bb_pos, 118);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  static startOPM(builder) {
    builder.startObject(58);
  }
  static addCCSDS_OPM_VERS(builder, CCSDS_OPM_VERS) {
    builder.addFieldFloat64(0, CCSDS_OPM_VERS, 0);
  }
  static addCREATION_DATE(builder, CREATION_DATEOffset) {
    builder.addFieldOffset(1, CREATION_DATEOffset, 0);
  }
  static addORIGINATOR(builder, ORIGINATOROffset) {
    builder.addFieldOffset(2, ORIGINATOROffset, 0);
  }
  static addOBJECT_NAME(builder, OBJECT_NAMEOffset) {
    builder.addFieldOffset(3, OBJECT_NAMEOffset, 0);
  }
  static addOBJECT_ID(builder, OBJECT_IDOffset) {
    builder.addFieldOffset(4, OBJECT_IDOffset, 0);
  }
  static addCENTER_NAME(builder, CENTER_NAMEOffset) {
    builder.addFieldOffset(5, CENTER_NAMEOffset, 0);
  }
  static addREF_FRAME(builder, REF_FRAME) {
    builder.addFieldInt8(6, REF_FRAME, import_referenceFrame.referenceFrame.EME2000);
  }
  static addREF_FRAME_EPOCH(builder, REF_FRAME_EPOCHOffset) {
    builder.addFieldOffset(7, REF_FRAME_EPOCHOffset, 0);
  }
  static addTIME_SYSTEM(builder, TIME_SYSTEM) {
    builder.addFieldInt8(8, TIME_SYSTEM, import_timeSystem.timeSystem.GMST);
  }
  static addCOMMENT(builder, COMMENTOffset) {
    builder.addFieldOffset(9, COMMENTOffset, 0);
  }
  static addEPOCH(builder, EPOCHOffset) {
    builder.addFieldOffset(10, EPOCHOffset, 0);
  }
  static addX(builder, X) {
    builder.addFieldFloat64(11, X, 0);
  }
  static addY(builder, Y) {
    builder.addFieldFloat64(12, Y, 0);
  }
  static addZ(builder, Z) {
    builder.addFieldFloat64(13, Z, 0);
  }
  static addX_DOT(builder, X_DOT) {
    builder.addFieldFloat64(14, X_DOT, 0);
  }
  static addY_DOT(builder, Y_DOT) {
    builder.addFieldFloat64(15, Y_DOT, 0);
  }
  static addZ_DOT(builder, Z_DOT) {
    builder.addFieldFloat64(16, Z_DOT, 0);
  }
  static addSEMI_MAJOR_AXIS(builder, SEMI_MAJOR_AXIS) {
    builder.addFieldFloat64(17, SEMI_MAJOR_AXIS, 0);
  }
  static addECCENTRICITY(builder, ECCENTRICITY) {
    builder.addFieldFloat64(18, ECCENTRICITY, 0);
  }
  static addINCLINATION(builder, INCLINATION) {
    builder.addFieldFloat64(19, INCLINATION, 0);
  }
  static addRA_OF_ASC_NODE(builder, RA_OF_ASC_NODE) {
    builder.addFieldFloat64(20, RA_OF_ASC_NODE, 0);
  }
  static addARG_OF_PERICENTER(builder, ARG_OF_PERICENTER) {
    builder.addFieldFloat64(21, ARG_OF_PERICENTER, 0);
  }
  static addTRUE_ANOMALY(builder, TRUE_ANOMALY) {
    builder.addFieldFloat64(22, TRUE_ANOMALY, 0);
  }
  static addMEAN_ANOMALY(builder, MEAN_ANOMALY) {
    builder.addFieldFloat64(23, MEAN_ANOMALY, 0);
  }
  static addGM(builder, GM) {
    builder.addFieldFloat64(24, GM, 0);
  }
  static addMASS(builder, MASS) {
    builder.addFieldFloat64(25, MASS, 0);
  }
  static addSOLAR_RAD_AREA(builder, SOLAR_RAD_AREA) {
    builder.addFieldFloat64(26, SOLAR_RAD_AREA, 0);
  }
  static addSOLAR_RAD_COEFF(builder, SOLAR_RAD_COEFF) {
    builder.addFieldFloat64(27, SOLAR_RAD_COEFF, 0);
  }
  static addDRAG_AREA(builder, DRAG_AREA) {
    builder.addFieldFloat64(28, DRAG_AREA, 0);
  }
  static addDRAG_COEFF(builder, DRAG_COEFF) {
    builder.addFieldFloat64(29, DRAG_COEFF, 0);
  }
  static addCOV_REF_FRAME(builder, COV_REF_FRAME) {
    builder.addFieldInt8(30, COV_REF_FRAME, import_manCovRefFrame.manCovRefFrame.RSW);
  }
  static addCX_X(builder, CX_X) {
    builder.addFieldFloat64(31, CX_X, 0);
  }
  static addCY_X(builder, CY_X) {
    builder.addFieldFloat64(32, CY_X, 0);
  }
  static addCY_Y(builder, CY_Y) {
    builder.addFieldFloat64(33, CY_Y, 0);
  }
  static addCZ_X(builder, CZ_X) {
    builder.addFieldFloat64(34, CZ_X, 0);
  }
  static addCZ_Y(builder, CZ_Y) {
    builder.addFieldFloat64(35, CZ_Y, 0);
  }
  static addCZ_Z(builder, CZ_Z) {
    builder.addFieldFloat64(36, CZ_Z, 0);
  }
  static addCX_DOT_X(builder, CX_DOT_X) {
    builder.addFieldFloat64(37, CX_DOT_X, 0);
  }
  static addCX_DOT_Y(builder, CX_DOT_Y) {
    builder.addFieldFloat64(38, CX_DOT_Y, 0);
  }
  static addCX_DOT_Z(builder, CX_DOT_Z) {
    builder.addFieldFloat64(39, CX_DOT_Z, 0);
  }
  static addCX_DOT_X_DOT(builder, CX_DOT_X_DOT) {
    builder.addFieldFloat64(40, CX_DOT_X_DOT, 0);
  }
  static addCY_DOT_X(builder, CY_DOT_X) {
    builder.addFieldFloat64(41, CY_DOT_X, 0);
  }
  static addCY_DOT_Y(builder, CY_DOT_Y) {
    builder.addFieldFloat64(42, CY_DOT_Y, 0);
  }
  static addCY_DOT_Z(builder, CY_DOT_Z) {
    builder.addFieldFloat64(43, CY_DOT_Z, 0);
  }
  static addCY_DOT_X_DOT(builder, CY_DOT_X_DOT) {
    builder.addFieldFloat64(44, CY_DOT_X_DOT, 0);
  }
  static addCY_DOT_Y_DOT(builder, CY_DOT_Y_DOT) {
    builder.addFieldFloat64(45, CY_DOT_Y_DOT, 0);
  }
  static addCZ_DOT_X(builder, CZ_DOT_X) {
    builder.addFieldFloat64(46, CZ_DOT_X, 0);
  }
  static addCZ_DOT_Y(builder, CZ_DOT_Y) {
    builder.addFieldFloat64(47, CZ_DOT_Y, 0);
  }
  static addCZ_DOT_Z(builder, CZ_DOT_Z) {
    builder.addFieldFloat64(48, CZ_DOT_Z, 0);
  }
  static addCZ_DOT_X_DOT(builder, CZ_DOT_X_DOT) {
    builder.addFieldFloat64(49, CZ_DOT_X_DOT, 0);
  }
  static addCZ_DOT_Y_DOT(builder, CZ_DOT_Y_DOT) {
    builder.addFieldFloat64(50, CZ_DOT_Y_DOT, 0);
  }
  static addCZ_DOT_Z_DOT(builder, CZ_DOT_Z_DOT) {
    builder.addFieldFloat64(51, CZ_DOT_Z_DOT, 0);
  }
  static addMANEUVERS(builder, MANEUVERSOffset) {
    builder.addFieldOffset(52, MANEUVERSOffset, 0);
  }
  static createMANEUVERSVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startMANEUVERSVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addUSER_DEFINED_BIP_0044_TYPE(builder, USER_DEFINED_BIP_0044_TYPE) {
    builder.addFieldInt32(53, USER_DEFINED_BIP_0044_TYPE, 0);
  }
  static addUSER_DEFINED_OBJECT_DESIGNATOR(builder, USER_DEFINED_OBJECT_DESIGNATOROffset) {
    builder.addFieldOffset(54, USER_DEFINED_OBJECT_DESIGNATOROffset, 0);
  }
  static addUSER_DEFINED_EARTH_MODEL(builder, USER_DEFINED_EARTH_MODELOffset) {
    builder.addFieldOffset(55, USER_DEFINED_EARTH_MODELOffset, 0);
  }
  static addUSER_DEFINED_EPOCH_TIMESTAMP(builder, USER_DEFINED_EPOCH_TIMESTAMP) {
    builder.addFieldFloat64(56, USER_DEFINED_EPOCH_TIMESTAMP, 0);
  }
  static addUSER_DEFINED_EPOCH_MICROSECONDS(builder, USER_DEFINED_EPOCH_MICROSECONDS) {
    builder.addFieldFloat64(57, USER_DEFINED_EPOCH_MICROSECONDS, 0);
  }
  static endOPM(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static finishOPMBuffer(builder, offset) {
    builder.finish(offset, "$OPM");
  }
  static finishSizePrefixedOPMBuffer(builder, offset) {
    builder.finish(offset, "$OPM", true);
  }
  static createOPM(builder, CCSDS_OPM_VERS, CREATION_DATEOffset, ORIGINATOROffset, OBJECT_NAMEOffset, OBJECT_IDOffset, CENTER_NAMEOffset, REF_FRAME, REF_FRAME_EPOCHOffset, TIME_SYSTEM, COMMENTOffset, EPOCHOffset, X, Y, Z, X_DOT, Y_DOT, Z_DOT, SEMI_MAJOR_AXIS, ECCENTRICITY, INCLINATION, RA_OF_ASC_NODE, ARG_OF_PERICENTER, TRUE_ANOMALY, MEAN_ANOMALY, GM, MASS, SOLAR_RAD_AREA, SOLAR_RAD_COEFF, DRAG_AREA, DRAG_COEFF, COV_REF_FRAME, CX_X, CY_X, CY_Y, CZ_X, CZ_Y, CZ_Z, CX_DOT_X, CX_DOT_Y, CX_DOT_Z, CX_DOT_X_DOT, CY_DOT_X, CY_DOT_Y, CY_DOT_Z, CY_DOT_X_DOT, CY_DOT_Y_DOT, CZ_DOT_X, CZ_DOT_Y, CZ_DOT_Z, CZ_DOT_X_DOT, CZ_DOT_Y_DOT, CZ_DOT_Z_DOT, MANEUVERSOffset, USER_DEFINED_BIP_0044_TYPE, USER_DEFINED_OBJECT_DESIGNATOROffset, USER_DEFINED_EARTH_MODELOffset, USER_DEFINED_EPOCH_TIMESTAMP, USER_DEFINED_EPOCH_MICROSECONDS) {
    OPM.startOPM(builder);
    OPM.addCCSDS_OPM_VERS(builder, CCSDS_OPM_VERS);
    OPM.addCREATION_DATE(builder, CREATION_DATEOffset);
    OPM.addORIGINATOR(builder, ORIGINATOROffset);
    OPM.addOBJECT_NAME(builder, OBJECT_NAMEOffset);
    OPM.addOBJECT_ID(builder, OBJECT_IDOffset);
    OPM.addCENTER_NAME(builder, CENTER_NAMEOffset);
    OPM.addREF_FRAME(builder, REF_FRAME);
    OPM.addREF_FRAME_EPOCH(builder, REF_FRAME_EPOCHOffset);
    OPM.addTIME_SYSTEM(builder, TIME_SYSTEM);
    OPM.addCOMMENT(builder, COMMENTOffset);
    OPM.addEPOCH(builder, EPOCHOffset);
    OPM.addX(builder, X);
    OPM.addY(builder, Y);
    OPM.addZ(builder, Z);
    OPM.addX_DOT(builder, X_DOT);
    OPM.addY_DOT(builder, Y_DOT);
    OPM.addZ_DOT(builder, Z_DOT);
    OPM.addSEMI_MAJOR_AXIS(builder, SEMI_MAJOR_AXIS);
    OPM.addECCENTRICITY(builder, ECCENTRICITY);
    OPM.addINCLINATION(builder, INCLINATION);
    OPM.addRA_OF_ASC_NODE(builder, RA_OF_ASC_NODE);
    OPM.addARG_OF_PERICENTER(builder, ARG_OF_PERICENTER);
    OPM.addTRUE_ANOMALY(builder, TRUE_ANOMALY);
    OPM.addMEAN_ANOMALY(builder, MEAN_ANOMALY);
    OPM.addGM(builder, GM);
    OPM.addMASS(builder, MASS);
    OPM.addSOLAR_RAD_AREA(builder, SOLAR_RAD_AREA);
    OPM.addSOLAR_RAD_COEFF(builder, SOLAR_RAD_COEFF);
    OPM.addDRAG_AREA(builder, DRAG_AREA);
    OPM.addDRAG_COEFF(builder, DRAG_COEFF);
    OPM.addCOV_REF_FRAME(builder, COV_REF_FRAME);
    OPM.addCX_X(builder, CX_X);
    OPM.addCY_X(builder, CY_X);
    OPM.addCY_Y(builder, CY_Y);
    OPM.addCZ_X(builder, CZ_X);
    OPM.addCZ_Y(builder, CZ_Y);
    OPM.addCZ_Z(builder, CZ_Z);
    OPM.addCX_DOT_X(builder, CX_DOT_X);
    OPM.addCX_DOT_Y(builder, CX_DOT_Y);
    OPM.addCX_DOT_Z(builder, CX_DOT_Z);
    OPM.addCX_DOT_X_DOT(builder, CX_DOT_X_DOT);
    OPM.addCY_DOT_X(builder, CY_DOT_X);
    OPM.addCY_DOT_Y(builder, CY_DOT_Y);
    OPM.addCY_DOT_Z(builder, CY_DOT_Z);
    OPM.addCY_DOT_X_DOT(builder, CY_DOT_X_DOT);
    OPM.addCY_DOT_Y_DOT(builder, CY_DOT_Y_DOT);
    OPM.addCZ_DOT_X(builder, CZ_DOT_X);
    OPM.addCZ_DOT_Y(builder, CZ_DOT_Y);
    OPM.addCZ_DOT_Z(builder, CZ_DOT_Z);
    OPM.addCZ_DOT_X_DOT(builder, CZ_DOT_X_DOT);
    OPM.addCZ_DOT_Y_DOT(builder, CZ_DOT_Y_DOT);
    OPM.addCZ_DOT_Z_DOT(builder, CZ_DOT_Z_DOT);
    OPM.addMANEUVERS(builder, MANEUVERSOffset);
    OPM.addUSER_DEFINED_BIP_0044_TYPE(builder, USER_DEFINED_BIP_0044_TYPE);
    OPM.addUSER_DEFINED_OBJECT_DESIGNATOR(builder, USER_DEFINED_OBJECT_DESIGNATOROffset);
    OPM.addUSER_DEFINED_EARTH_MODEL(builder, USER_DEFINED_EARTH_MODELOffset);
    OPM.addUSER_DEFINED_EPOCH_TIMESTAMP(builder, USER_DEFINED_EPOCH_TIMESTAMP);
    OPM.addUSER_DEFINED_EPOCH_MICROSECONDS(builder, USER_DEFINED_EPOCH_MICROSECONDS);
    return OPM.endOPM(builder);
  }
  unpack() {
    return new OPMT(
      this.CCSDS_OPM_VERS(),
      this.CREATION_DATE(),
      this.ORIGINATOR(),
      this.OBJECT_NAME(),
      this.OBJECT_ID(),
      this.CENTER_NAME(),
      this.REF_FRAME(),
      this.REF_FRAME_EPOCH(),
      this.TIME_SYSTEM(),
      this.COMMENT(),
      this.EPOCH(),
      this.X(),
      this.Y(),
      this.Z(),
      this.X_DOT(),
      this.Y_DOT(),
      this.Z_DOT(),
      this.SEMI_MAJOR_AXIS(),
      this.ECCENTRICITY(),
      this.INCLINATION(),
      this.RA_OF_ASC_NODE(),
      this.ARG_OF_PERICENTER(),
      this.TRUE_ANOMALY(),
      this.MEAN_ANOMALY(),
      this.GM(),
      this.MASS(),
      this.SOLAR_RAD_AREA(),
      this.SOLAR_RAD_COEFF(),
      this.DRAG_AREA(),
      this.DRAG_COEFF(),
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
      this.CZ_DOT_Z_DOT(),
      this.bb.createObjList(this.MANEUVERS.bind(this), this.MANEUVERSLength()),
      this.USER_DEFINED_BIP_0044_TYPE(),
      this.USER_DEFINED_OBJECT_DESIGNATOR(),
      this.USER_DEFINED_EARTH_MODEL(),
      this.USER_DEFINED_EPOCH_TIMESTAMP(),
      this.USER_DEFINED_EPOCH_MICROSECONDS()
    );
  }
  unpackTo(_o) {
    _o.CCSDS_OPM_VERS = this.CCSDS_OPM_VERS();
    _o.CREATION_DATE = this.CREATION_DATE();
    _o.ORIGINATOR = this.ORIGINATOR();
    _o.OBJECT_NAME = this.OBJECT_NAME();
    _o.OBJECT_ID = this.OBJECT_ID();
    _o.CENTER_NAME = this.CENTER_NAME();
    _o.REF_FRAME = this.REF_FRAME();
    _o.REF_FRAME_EPOCH = this.REF_FRAME_EPOCH();
    _o.TIME_SYSTEM = this.TIME_SYSTEM();
    _o.COMMENT = this.COMMENT();
    _o.EPOCH = this.EPOCH();
    _o.X = this.X();
    _o.Y = this.Y();
    _o.Z = this.Z();
    _o.X_DOT = this.X_DOT();
    _o.Y_DOT = this.Y_DOT();
    _o.Z_DOT = this.Z_DOT();
    _o.SEMI_MAJOR_AXIS = this.SEMI_MAJOR_AXIS();
    _o.ECCENTRICITY = this.ECCENTRICITY();
    _o.INCLINATION = this.INCLINATION();
    _o.RA_OF_ASC_NODE = this.RA_OF_ASC_NODE();
    _o.ARG_OF_PERICENTER = this.ARG_OF_PERICENTER();
    _o.TRUE_ANOMALY = this.TRUE_ANOMALY();
    _o.MEAN_ANOMALY = this.MEAN_ANOMALY();
    _o.GM = this.GM();
    _o.MASS = this.MASS();
    _o.SOLAR_RAD_AREA = this.SOLAR_RAD_AREA();
    _o.SOLAR_RAD_COEFF = this.SOLAR_RAD_COEFF();
    _o.DRAG_AREA = this.DRAG_AREA();
    _o.DRAG_COEFF = this.DRAG_COEFF();
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
    _o.MANEUVERS = this.bb.createObjList(this.MANEUVERS.bind(this), this.MANEUVERSLength());
    _o.USER_DEFINED_BIP_0044_TYPE = this.USER_DEFINED_BIP_0044_TYPE();
    _o.USER_DEFINED_OBJECT_DESIGNATOR = this.USER_DEFINED_OBJECT_DESIGNATOR();
    _o.USER_DEFINED_EARTH_MODEL = this.USER_DEFINED_EARTH_MODEL();
    _o.USER_DEFINED_EPOCH_TIMESTAMP = this.USER_DEFINED_EPOCH_TIMESTAMP();
    _o.USER_DEFINED_EPOCH_MICROSECONDS = this.USER_DEFINED_EPOCH_MICROSECONDS();
  }
}
class OPMT {
  constructor(CCSDS_OPM_VERS = 0, CREATION_DATE = null, ORIGINATOR = null, OBJECT_NAME = null, OBJECT_ID = null, CENTER_NAME = null, REF_FRAME = import_referenceFrame.referenceFrame.EME2000, REF_FRAME_EPOCH = null, TIME_SYSTEM = import_timeSystem.timeSystem.GMST, COMMENT = null, EPOCH = null, X = 0, Y = 0, Z = 0, X_DOT = 0, Y_DOT = 0, Z_DOT = 0, SEMI_MAJOR_AXIS = 0, ECCENTRICITY = 0, INCLINATION = 0, RA_OF_ASC_NODE = 0, ARG_OF_PERICENTER = 0, TRUE_ANOMALY = 0, MEAN_ANOMALY = 0, GM = 0, MASS = 0, SOLAR_RAD_AREA = 0, SOLAR_RAD_COEFF = 0, DRAG_AREA = 0, DRAG_COEFF = 0, COV_REF_FRAME = import_manCovRefFrame.manCovRefFrame.RSW, CX_X = 0, CY_X = 0, CY_Y = 0, CZ_X = 0, CZ_Y = 0, CZ_Z = 0, CX_DOT_X = 0, CX_DOT_Y = 0, CX_DOT_Z = 0, CX_DOT_X_DOT = 0, CY_DOT_X = 0, CY_DOT_Y = 0, CY_DOT_Z = 0, CY_DOT_X_DOT = 0, CY_DOT_Y_DOT = 0, CZ_DOT_X = 0, CZ_DOT_Y = 0, CZ_DOT_Z = 0, CZ_DOT_X_DOT = 0, CZ_DOT_Y_DOT = 0, CZ_DOT_Z_DOT = 0, MANEUVERS = [], USER_DEFINED_BIP_0044_TYPE = 0, USER_DEFINED_OBJECT_DESIGNATOR = null, USER_DEFINED_EARTH_MODEL = null, USER_DEFINED_EPOCH_TIMESTAMP = 0, USER_DEFINED_EPOCH_MICROSECONDS = 0) {
    this.CCSDS_OPM_VERS = CCSDS_OPM_VERS;
    this.CREATION_DATE = CREATION_DATE;
    this.ORIGINATOR = ORIGINATOR;
    this.OBJECT_NAME = OBJECT_NAME;
    this.OBJECT_ID = OBJECT_ID;
    this.CENTER_NAME = CENTER_NAME;
    this.REF_FRAME = REF_FRAME;
    this.REF_FRAME_EPOCH = REF_FRAME_EPOCH;
    this.TIME_SYSTEM = TIME_SYSTEM;
    this.COMMENT = COMMENT;
    this.EPOCH = EPOCH;
    this.X = X;
    this.Y = Y;
    this.Z = Z;
    this.X_DOT = X_DOT;
    this.Y_DOT = Y_DOT;
    this.Z_DOT = Z_DOT;
    this.SEMI_MAJOR_AXIS = SEMI_MAJOR_AXIS;
    this.ECCENTRICITY = ECCENTRICITY;
    this.INCLINATION = INCLINATION;
    this.RA_OF_ASC_NODE = RA_OF_ASC_NODE;
    this.ARG_OF_PERICENTER = ARG_OF_PERICENTER;
    this.TRUE_ANOMALY = TRUE_ANOMALY;
    this.MEAN_ANOMALY = MEAN_ANOMALY;
    this.GM = GM;
    this.MASS = MASS;
    this.SOLAR_RAD_AREA = SOLAR_RAD_AREA;
    this.SOLAR_RAD_COEFF = SOLAR_RAD_COEFF;
    this.DRAG_AREA = DRAG_AREA;
    this.DRAG_COEFF = DRAG_COEFF;
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
    this.MANEUVERS = MANEUVERS;
    this.USER_DEFINED_BIP_0044_TYPE = USER_DEFINED_BIP_0044_TYPE;
    this.USER_DEFINED_OBJECT_DESIGNATOR = USER_DEFINED_OBJECT_DESIGNATOR;
    this.USER_DEFINED_EARTH_MODEL = USER_DEFINED_EARTH_MODEL;
    this.USER_DEFINED_EPOCH_TIMESTAMP = USER_DEFINED_EPOCH_TIMESTAMP;
    this.USER_DEFINED_EPOCH_MICROSECONDS = USER_DEFINED_EPOCH_MICROSECONDS;
  }
  pack(builder) {
    const CREATION_DATE = this.CREATION_DATE !== null ? builder.createString(this.CREATION_DATE) : 0;
    const ORIGINATOR = this.ORIGINATOR !== null ? builder.createString(this.ORIGINATOR) : 0;
    const OBJECT_NAME = this.OBJECT_NAME !== null ? builder.createString(this.OBJECT_NAME) : 0;
    const OBJECT_ID = this.OBJECT_ID !== null ? builder.createString(this.OBJECT_ID) : 0;
    const CENTER_NAME = this.CENTER_NAME !== null ? builder.createString(this.CENTER_NAME) : 0;
    const REF_FRAME_EPOCH = this.REF_FRAME_EPOCH !== null ? builder.createString(this.REF_FRAME_EPOCH) : 0;
    const COMMENT = this.COMMENT !== null ? builder.createString(this.COMMENT) : 0;
    const EPOCH = this.EPOCH !== null ? builder.createString(this.EPOCH) : 0;
    const MANEUVERS = OPM.createMANEUVERSVector(builder, builder.createObjectOffsetList(this.MANEUVERS));
    const USER_DEFINED_OBJECT_DESIGNATOR = this.USER_DEFINED_OBJECT_DESIGNATOR !== null ? builder.createString(this.USER_DEFINED_OBJECT_DESIGNATOR) : 0;
    const USER_DEFINED_EARTH_MODEL = this.USER_DEFINED_EARTH_MODEL !== null ? builder.createString(this.USER_DEFINED_EARTH_MODEL) : 0;
    return OPM.createOPM(
      builder,
      this.CCSDS_OPM_VERS,
      CREATION_DATE,
      ORIGINATOR,
      OBJECT_NAME,
      OBJECT_ID,
      CENTER_NAME,
      this.REF_FRAME,
      REF_FRAME_EPOCH,
      this.TIME_SYSTEM,
      COMMENT,
      EPOCH,
      this.X,
      this.Y,
      this.Z,
      this.X_DOT,
      this.Y_DOT,
      this.Z_DOT,
      this.SEMI_MAJOR_AXIS,
      this.ECCENTRICITY,
      this.INCLINATION,
      this.RA_OF_ASC_NODE,
      this.ARG_OF_PERICENTER,
      this.TRUE_ANOMALY,
      this.MEAN_ANOMALY,
      this.GM,
      this.MASS,
      this.SOLAR_RAD_AREA,
      this.SOLAR_RAD_COEFF,
      this.DRAG_AREA,
      this.DRAG_COEFF,
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
      this.CZ_DOT_Z_DOT,
      MANEUVERS,
      this.USER_DEFINED_BIP_0044_TYPE,
      USER_DEFINED_OBJECT_DESIGNATOR,
      USER_DEFINED_EARTH_MODEL,
      this.USER_DEFINED_EPOCH_TIMESTAMP,
      this.USER_DEFINED_EPOCH_MICROSECONDS
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OPM,
  OPMT
});
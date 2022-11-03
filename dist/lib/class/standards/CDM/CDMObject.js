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
var CDMObject_exports = {};
__export(CDMObject_exports, {
  CDMObject: () => CDMObject,
  CDMObjectT: () => CDMObjectT
});
module.exports = __toCommonJS(CDMObject_exports);
var flatbuffers = __toESM(require("flatbuffers"));
var import_covarianceMethod = require("./covarianceMethod");
var import_maneuverableType = require("./maneuverableType");
var import_objectNumber = require("./objectNumber");
var import_objectType = require("./objectType");
var import_referenceFrame = require("./referenceFrame");
class CDMObject {
  bb = null;
  bb_pos = 0;
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsCDMObject(bb, obj) {
    return (obj || new CDMObject()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsCDMObject(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new CDMObject()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  COMMENT(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  OBJECT() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_objectNumber.objectNumber.OBJECT1;
  }
  OBJECT_DESIGNATOR(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  CATALOG_NAME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  OBJECT_NAME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  INTERNATIONAL_DESIGNATOR(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  OBJECT_TYPE() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_objectType.objectType.PAYLOAD;
  }
  OPERATOR_CONTACT_POSITION(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  OPERATOR_ORGANIZATION(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  EPHEMERIS_NAME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  COVARIANCE_METHOD() {
    const offset = this.bb.__offset(this.bb_pos, 24);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_covarianceMethod.covarianceMethod.CALCULATED;
  }
  MANEUVERABLE() {
    const offset = this.bb.__offset(this.bb_pos, 26);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_maneuverableType.maneuverableType.YES;
  }
  ORBIT_CENTER(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 28);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  REF_FRAME() {
    const offset = this.bb.__offset(this.bb_pos, 30);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_referenceFrame.referenceFrame.EME2000;
  }
  GRAVITY_MODEL(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 32);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  ATMOSPHERIC_MODEL(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 34);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  N_BODY_PERTURBATIONS(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 36);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  SOLAR_RAD_PRESSURE() {
    const offset = this.bb.__offset(this.bb_pos, 38);
    return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
  }
  EARTH_TIDES() {
    const offset = this.bb.__offset(this.bb_pos, 40);
    return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
  }
  INTRACK_THRUST() {
    const offset = this.bb.__offset(this.bb_pos, 42);
    return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
  }
  TIME_LASTOB_START(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 44);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  TIME_LASTOB_END(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 46);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  RECOMMENDED_OD_SPAN() {
    const offset = this.bb.__offset(this.bb_pos, 48);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  ACTUAL_OD_SPAN() {
    const offset = this.bb.__offset(this.bb_pos, 50);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  OBS_AVAILABLE() {
    const offset = this.bb.__offset(this.bb_pos, 52);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  OBS_USED() {
    const offset = this.bb.__offset(this.bb_pos, 54);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  TRACKS_AVAILABLE() {
    const offset = this.bb.__offset(this.bb_pos, 56);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  TRACKS_USED() {
    const offset = this.bb.__offset(this.bb_pos, 58);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  RESIDUALS_ACCEPTED() {
    const offset = this.bb.__offset(this.bb_pos, 60);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  WEIGHTED_RMS() {
    const offset = this.bb.__offset(this.bb_pos, 62);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  AREA_PC() {
    const offset = this.bb.__offset(this.bb_pos, 64);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  AREA_DRG() {
    const offset = this.bb.__offset(this.bb_pos, 66);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  AREA_SRP() {
    const offset = this.bb.__offset(this.bb_pos, 68);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  MASS() {
    const offset = this.bb.__offset(this.bb_pos, 70);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CR_AREA_OVER_MASS() {
    const offset = this.bb.__offset(this.bb_pos, 72);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  THRUST_ACCELERATION() {
    const offset = this.bb.__offset(this.bb_pos, 74);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  SEDR() {
    const offset = this.bb.__offset(this.bb_pos, 76);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  X() {
    const offset = this.bb.__offset(this.bb_pos, 78);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Y() {
    const offset = this.bb.__offset(this.bb_pos, 80);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Z() {
    const offset = this.bb.__offset(this.bb_pos, 82);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  X_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 84);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Y_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 86);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  Z_DOT() {
    const offset = this.bb.__offset(this.bb_pos, 88);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CR_R() {
    const offset = this.bb.__offset(this.bb_pos, 90);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CT_R() {
    const offset = this.bb.__offset(this.bb_pos, 92);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CT_T() {
    const offset = this.bb.__offset(this.bb_pos, 94);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CN_R() {
    const offset = this.bb.__offset(this.bb_pos, 96);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CN_T() {
    const offset = this.bb.__offset(this.bb_pos, 98);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CN_N() {
    const offset = this.bb.__offset(this.bb_pos, 100);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CRDOT_R() {
    const offset = this.bb.__offset(this.bb_pos, 102);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CRDOT_T() {
    const offset = this.bb.__offset(this.bb_pos, 104);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CRDOT_N() {
    const offset = this.bb.__offset(this.bb_pos, 106);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CRDOT_RDOT() {
    const offset = this.bb.__offset(this.bb_pos, 108);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTDOT_R() {
    const offset = this.bb.__offset(this.bb_pos, 110);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTDOT_T() {
    const offset = this.bb.__offset(this.bb_pos, 112);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTDOT_N() {
    const offset = this.bb.__offset(this.bb_pos, 114);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTDOT_RDOT() {
    const offset = this.bb.__offset(this.bb_pos, 116);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTDOT_TDOT() {
    const offset = this.bb.__offset(this.bb_pos, 118);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CNDOT_R() {
    const offset = this.bb.__offset(this.bb_pos, 120);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CNDOT_T() {
    const offset = this.bb.__offset(this.bb_pos, 122);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CNDOT_N() {
    const offset = this.bb.__offset(this.bb_pos, 124);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CNDOT_RDOT() {
    const offset = this.bb.__offset(this.bb_pos, 126);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CNDOT_TDOT() {
    const offset = this.bb.__offset(this.bb_pos, 128);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CNDOT_NDOT() {
    const offset = this.bb.__offset(this.bb_pos, 130);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CDRG_R() {
    const offset = this.bb.__offset(this.bb_pos, 132);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CDRG_T() {
    const offset = this.bb.__offset(this.bb_pos, 134);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CDRG_N() {
    const offset = this.bb.__offset(this.bb_pos, 136);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CDRG_RDOT() {
    const offset = this.bb.__offset(this.bb_pos, 138);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CDRG_TDOT() {
    const offset = this.bb.__offset(this.bb_pos, 140);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CDRG_NDOT() {
    const offset = this.bb.__offset(this.bb_pos, 142);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CDRG_DRG() {
    const offset = this.bb.__offset(this.bb_pos, 144);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CSRP_R() {
    const offset = this.bb.__offset(this.bb_pos, 146);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CSRP_T() {
    const offset = this.bb.__offset(this.bb_pos, 148);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CSRP_N() {
    const offset = this.bb.__offset(this.bb_pos, 150);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CSRP_RDOT() {
    const offset = this.bb.__offset(this.bb_pos, 152);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CSRP_TDOT() {
    const offset = this.bb.__offset(this.bb_pos, 154);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CSRP_NDOT() {
    const offset = this.bb.__offset(this.bb_pos, 156);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CSRP_DRG() {
    const offset = this.bb.__offset(this.bb_pos, 158);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CSRP_SRP() {
    const offset = this.bb.__offset(this.bb_pos, 160);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTHR_R() {
    const offset = this.bb.__offset(this.bb_pos, 162);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTHR_T() {
    const offset = this.bb.__offset(this.bb_pos, 164);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTHR_N() {
    const offset = this.bb.__offset(this.bb_pos, 166);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTHR_RDOT() {
    const offset = this.bb.__offset(this.bb_pos, 168);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTHR_TDOT() {
    const offset = this.bb.__offset(this.bb_pos, 170);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTHR_NDOT() {
    const offset = this.bb.__offset(this.bb_pos, 172);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTHR_DRG() {
    const offset = this.bb.__offset(this.bb_pos, 174);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTHR_SRP() {
    const offset = this.bb.__offset(this.bb_pos, 176);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  CTHR_THR() {
    const offset = this.bb.__offset(this.bb_pos, 178);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  static startCDMObject(builder) {
    builder.startObject(88);
  }
  static addCOMMENT(builder, COMMENTOffset) {
    builder.addFieldOffset(0, COMMENTOffset, 0);
  }
  static addOBJECT(builder, OBJECT) {
    builder.addFieldInt8(1, OBJECT, import_objectNumber.objectNumber.OBJECT1);
  }
  static addOBJECT_DESIGNATOR(builder, OBJECT_DESIGNATOROffset) {
    builder.addFieldOffset(2, OBJECT_DESIGNATOROffset, 0);
  }
  static addCATALOG_NAME(builder, CATALOG_NAMEOffset) {
    builder.addFieldOffset(3, CATALOG_NAMEOffset, 0);
  }
  static addOBJECT_NAME(builder, OBJECT_NAMEOffset) {
    builder.addFieldOffset(4, OBJECT_NAMEOffset, 0);
  }
  static addINTERNATIONAL_DESIGNATOR(builder, INTERNATIONAL_DESIGNATOROffset) {
    builder.addFieldOffset(5, INTERNATIONAL_DESIGNATOROffset, 0);
  }
  static addOBJECT_TYPE(builder, OBJECT_TYPE) {
    builder.addFieldInt8(6, OBJECT_TYPE, import_objectType.objectType.PAYLOAD);
  }
  static addOPERATOR_CONTACT_POSITION(builder, OPERATOR_CONTACT_POSITIONOffset) {
    builder.addFieldOffset(7, OPERATOR_CONTACT_POSITIONOffset, 0);
  }
  static addOPERATOR_ORGANIZATION(builder, OPERATOR_ORGANIZATIONOffset) {
    builder.addFieldOffset(8, OPERATOR_ORGANIZATIONOffset, 0);
  }
  static addEPHEMERIS_NAME(builder, EPHEMERIS_NAMEOffset) {
    builder.addFieldOffset(9, EPHEMERIS_NAMEOffset, 0);
  }
  static addCOVARIANCE_METHOD(builder, COVARIANCE_METHOD) {
    builder.addFieldInt8(10, COVARIANCE_METHOD, import_covarianceMethod.covarianceMethod.CALCULATED);
  }
  static addMANEUVERABLE(builder, MANEUVERABLE) {
    builder.addFieldInt8(11, MANEUVERABLE, import_maneuverableType.maneuverableType.YES);
  }
  static addORBIT_CENTER(builder, ORBIT_CENTEROffset) {
    builder.addFieldOffset(12, ORBIT_CENTEROffset, 0);
  }
  static addREF_FRAME(builder, REF_FRAME) {
    builder.addFieldInt8(13, REF_FRAME, import_referenceFrame.referenceFrame.EME2000);
  }
  static addGRAVITY_MODEL(builder, GRAVITY_MODELOffset) {
    builder.addFieldOffset(14, GRAVITY_MODELOffset, 0);
  }
  static addATMOSPHERIC_MODEL(builder, ATMOSPHERIC_MODELOffset) {
    builder.addFieldOffset(15, ATMOSPHERIC_MODELOffset, 0);
  }
  static addN_BODY_PERTURBATIONS(builder, N_BODY_PERTURBATIONSOffset) {
    builder.addFieldOffset(16, N_BODY_PERTURBATIONSOffset, 0);
  }
  static addSOLAR_RAD_PRESSURE(builder, SOLAR_RAD_PRESSURE) {
    builder.addFieldInt8(17, +SOLAR_RAD_PRESSURE, 0);
  }
  static addEARTH_TIDES(builder, EARTH_TIDES) {
    builder.addFieldInt8(18, +EARTH_TIDES, 0);
  }
  static addINTRACK_THRUST(builder, INTRACK_THRUST) {
    builder.addFieldInt8(19, +INTRACK_THRUST, 0);
  }
  static addTIME_LASTOB_START(builder, TIME_LASTOB_STARTOffset) {
    builder.addFieldOffset(20, TIME_LASTOB_STARTOffset, 0);
  }
  static addTIME_LASTOB_END(builder, TIME_LASTOB_ENDOffset) {
    builder.addFieldOffset(21, TIME_LASTOB_ENDOffset, 0);
  }
  static addRECOMMENDED_OD_SPAN(builder, RECOMMENDED_OD_SPAN) {
    builder.addFieldFloat64(22, RECOMMENDED_OD_SPAN, 0);
  }
  static addACTUAL_OD_SPAN(builder, ACTUAL_OD_SPAN) {
    builder.addFieldFloat64(23, ACTUAL_OD_SPAN, 0);
  }
  static addOBS_AVAILABLE(builder, OBS_AVAILABLE) {
    builder.addFieldInt32(24, OBS_AVAILABLE, 0);
  }
  static addOBS_USED(builder, OBS_USED) {
    builder.addFieldInt32(25, OBS_USED, 0);
  }
  static addTRACKS_AVAILABLE(builder, TRACKS_AVAILABLE) {
    builder.addFieldInt32(26, TRACKS_AVAILABLE, 0);
  }
  static addTRACKS_USED(builder, TRACKS_USED) {
    builder.addFieldInt32(27, TRACKS_USED, 0);
  }
  static addRESIDUALS_ACCEPTED(builder, RESIDUALS_ACCEPTED) {
    builder.addFieldFloat64(28, RESIDUALS_ACCEPTED, 0);
  }
  static addWEIGHTED_RMS(builder, WEIGHTED_RMS) {
    builder.addFieldFloat64(29, WEIGHTED_RMS, 0);
  }
  static addAREA_PC(builder, AREA_PC) {
    builder.addFieldFloat64(30, AREA_PC, 0);
  }
  static addAREA_DRG(builder, AREA_DRG) {
    builder.addFieldFloat64(31, AREA_DRG, 0);
  }
  static addAREA_SRP(builder, AREA_SRP) {
    builder.addFieldFloat64(32, AREA_SRP, 0);
  }
  static addMASS(builder, MASS) {
    builder.addFieldFloat64(33, MASS, 0);
  }
  static addCR_AREA_OVER_MASS(builder, CR_AREA_OVER_MASS) {
    builder.addFieldFloat64(34, CR_AREA_OVER_MASS, 0);
  }
  static addTHRUST_ACCELERATION(builder, THRUST_ACCELERATION) {
    builder.addFieldFloat64(35, THRUST_ACCELERATION, 0);
  }
  static addSEDR(builder, SEDR) {
    builder.addFieldFloat64(36, SEDR, 0);
  }
  static addX(builder, X) {
    builder.addFieldFloat64(37, X, 0);
  }
  static addY(builder, Y) {
    builder.addFieldFloat64(38, Y, 0);
  }
  static addZ(builder, Z) {
    builder.addFieldFloat64(39, Z, 0);
  }
  static addX_DOT(builder, X_DOT) {
    builder.addFieldFloat64(40, X_DOT, 0);
  }
  static addY_DOT(builder, Y_DOT) {
    builder.addFieldFloat64(41, Y_DOT, 0);
  }
  static addZ_DOT(builder, Z_DOT) {
    builder.addFieldFloat64(42, Z_DOT, 0);
  }
  static addCR_R(builder, CR_R) {
    builder.addFieldFloat64(43, CR_R, 0);
  }
  static addCT_R(builder, CT_R) {
    builder.addFieldFloat64(44, CT_R, 0);
  }
  static addCT_T(builder, CT_T) {
    builder.addFieldFloat64(45, CT_T, 0);
  }
  static addCN_R(builder, CN_R) {
    builder.addFieldFloat64(46, CN_R, 0);
  }
  static addCN_T(builder, CN_T) {
    builder.addFieldFloat64(47, CN_T, 0);
  }
  static addCN_N(builder, CN_N) {
    builder.addFieldFloat64(48, CN_N, 0);
  }
  static addCRDOT_R(builder, CRDOT_R) {
    builder.addFieldFloat64(49, CRDOT_R, 0);
  }
  static addCRDOT_T(builder, CRDOT_T) {
    builder.addFieldFloat64(50, CRDOT_T, 0);
  }
  static addCRDOT_N(builder, CRDOT_N) {
    builder.addFieldFloat64(51, CRDOT_N, 0);
  }
  static addCRDOT_RDOT(builder, CRDOT_RDOT) {
    builder.addFieldFloat64(52, CRDOT_RDOT, 0);
  }
  static addCTDOT_R(builder, CTDOT_R) {
    builder.addFieldFloat64(53, CTDOT_R, 0);
  }
  static addCTDOT_T(builder, CTDOT_T) {
    builder.addFieldFloat64(54, CTDOT_T, 0);
  }
  static addCTDOT_N(builder, CTDOT_N) {
    builder.addFieldFloat64(55, CTDOT_N, 0);
  }
  static addCTDOT_RDOT(builder, CTDOT_RDOT) {
    builder.addFieldFloat64(56, CTDOT_RDOT, 0);
  }
  static addCTDOT_TDOT(builder, CTDOT_TDOT) {
    builder.addFieldFloat64(57, CTDOT_TDOT, 0);
  }
  static addCNDOT_R(builder, CNDOT_R) {
    builder.addFieldFloat64(58, CNDOT_R, 0);
  }
  static addCNDOT_T(builder, CNDOT_T) {
    builder.addFieldFloat64(59, CNDOT_T, 0);
  }
  static addCNDOT_N(builder, CNDOT_N) {
    builder.addFieldFloat64(60, CNDOT_N, 0);
  }
  static addCNDOT_RDOT(builder, CNDOT_RDOT) {
    builder.addFieldFloat64(61, CNDOT_RDOT, 0);
  }
  static addCNDOT_TDOT(builder, CNDOT_TDOT) {
    builder.addFieldFloat64(62, CNDOT_TDOT, 0);
  }
  static addCNDOT_NDOT(builder, CNDOT_NDOT) {
    builder.addFieldFloat64(63, CNDOT_NDOT, 0);
  }
  static addCDRG_R(builder, CDRG_R) {
    builder.addFieldFloat64(64, CDRG_R, 0);
  }
  static addCDRG_T(builder, CDRG_T) {
    builder.addFieldFloat64(65, CDRG_T, 0);
  }
  static addCDRG_N(builder, CDRG_N) {
    builder.addFieldFloat64(66, CDRG_N, 0);
  }
  static addCDRG_RDOT(builder, CDRG_RDOT) {
    builder.addFieldFloat64(67, CDRG_RDOT, 0);
  }
  static addCDRG_TDOT(builder, CDRG_TDOT) {
    builder.addFieldFloat64(68, CDRG_TDOT, 0);
  }
  static addCDRG_NDOT(builder, CDRG_NDOT) {
    builder.addFieldFloat64(69, CDRG_NDOT, 0);
  }
  static addCDRG_DRG(builder, CDRG_DRG) {
    builder.addFieldFloat64(70, CDRG_DRG, 0);
  }
  static addCSRP_R(builder, CSRP_R) {
    builder.addFieldFloat64(71, CSRP_R, 0);
  }
  static addCSRP_T(builder, CSRP_T) {
    builder.addFieldFloat64(72, CSRP_T, 0);
  }
  static addCSRP_N(builder, CSRP_N) {
    builder.addFieldFloat64(73, CSRP_N, 0);
  }
  static addCSRP_RDOT(builder, CSRP_RDOT) {
    builder.addFieldFloat64(74, CSRP_RDOT, 0);
  }
  static addCSRP_TDOT(builder, CSRP_TDOT) {
    builder.addFieldFloat64(75, CSRP_TDOT, 0);
  }
  static addCSRP_NDOT(builder, CSRP_NDOT) {
    builder.addFieldFloat64(76, CSRP_NDOT, 0);
  }
  static addCSRP_DRG(builder, CSRP_DRG) {
    builder.addFieldFloat64(77, CSRP_DRG, 0);
  }
  static addCSRP_SRP(builder, CSRP_SRP) {
    builder.addFieldFloat64(78, CSRP_SRP, 0);
  }
  static addCTHR_R(builder, CTHR_R) {
    builder.addFieldFloat64(79, CTHR_R, 0);
  }
  static addCTHR_T(builder, CTHR_T) {
    builder.addFieldFloat64(80, CTHR_T, 0);
  }
  static addCTHR_N(builder, CTHR_N) {
    builder.addFieldFloat64(81, CTHR_N, 0);
  }
  static addCTHR_RDOT(builder, CTHR_RDOT) {
    builder.addFieldFloat64(82, CTHR_RDOT, 0);
  }
  static addCTHR_TDOT(builder, CTHR_TDOT) {
    builder.addFieldFloat64(83, CTHR_TDOT, 0);
  }
  static addCTHR_NDOT(builder, CTHR_NDOT) {
    builder.addFieldFloat64(84, CTHR_NDOT, 0);
  }
  static addCTHR_DRG(builder, CTHR_DRG) {
    builder.addFieldFloat64(85, CTHR_DRG, 0);
  }
  static addCTHR_SRP(builder, CTHR_SRP) {
    builder.addFieldFloat64(86, CTHR_SRP, 0);
  }
  static addCTHR_THR(builder, CTHR_THR) {
    builder.addFieldFloat64(87, CTHR_THR, 0);
  }
  static endCDMObject(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createCDMObject(builder, COMMENTOffset, OBJECT, OBJECT_DESIGNATOROffset, CATALOG_NAMEOffset, OBJECT_NAMEOffset, INTERNATIONAL_DESIGNATOROffset, OBJECT_TYPE, OPERATOR_CONTACT_POSITIONOffset, OPERATOR_ORGANIZATIONOffset, EPHEMERIS_NAMEOffset, COVARIANCE_METHOD, MANEUVERABLE, ORBIT_CENTEROffset, REF_FRAME, GRAVITY_MODELOffset, ATMOSPHERIC_MODELOffset, N_BODY_PERTURBATIONSOffset, SOLAR_RAD_PRESSURE, EARTH_TIDES, INTRACK_THRUST, TIME_LASTOB_STARTOffset, TIME_LASTOB_ENDOffset, RECOMMENDED_OD_SPAN, ACTUAL_OD_SPAN, OBS_AVAILABLE, OBS_USED, TRACKS_AVAILABLE, TRACKS_USED, RESIDUALS_ACCEPTED, WEIGHTED_RMS, AREA_PC, AREA_DRG, AREA_SRP, MASS, CR_AREA_OVER_MASS, THRUST_ACCELERATION, SEDR, X, Y, Z, X_DOT, Y_DOT, Z_DOT, CR_R, CT_R, CT_T, CN_R, CN_T, CN_N, CRDOT_R, CRDOT_T, CRDOT_N, CRDOT_RDOT, CTDOT_R, CTDOT_T, CTDOT_N, CTDOT_RDOT, CTDOT_TDOT, CNDOT_R, CNDOT_T, CNDOT_N, CNDOT_RDOT, CNDOT_TDOT, CNDOT_NDOT, CDRG_R, CDRG_T, CDRG_N, CDRG_RDOT, CDRG_TDOT, CDRG_NDOT, CDRG_DRG, CSRP_R, CSRP_T, CSRP_N, CSRP_RDOT, CSRP_TDOT, CSRP_NDOT, CSRP_DRG, CSRP_SRP, CTHR_R, CTHR_T, CTHR_N, CTHR_RDOT, CTHR_TDOT, CTHR_NDOT, CTHR_DRG, CTHR_SRP, CTHR_THR) {
    CDMObject.startCDMObject(builder);
    CDMObject.addCOMMENT(builder, COMMENTOffset);
    CDMObject.addOBJECT(builder, OBJECT);
    CDMObject.addOBJECT_DESIGNATOR(builder, OBJECT_DESIGNATOROffset);
    CDMObject.addCATALOG_NAME(builder, CATALOG_NAMEOffset);
    CDMObject.addOBJECT_NAME(builder, OBJECT_NAMEOffset);
    CDMObject.addINTERNATIONAL_DESIGNATOR(builder, INTERNATIONAL_DESIGNATOROffset);
    CDMObject.addOBJECT_TYPE(builder, OBJECT_TYPE);
    CDMObject.addOPERATOR_CONTACT_POSITION(builder, OPERATOR_CONTACT_POSITIONOffset);
    CDMObject.addOPERATOR_ORGANIZATION(builder, OPERATOR_ORGANIZATIONOffset);
    CDMObject.addEPHEMERIS_NAME(builder, EPHEMERIS_NAMEOffset);
    CDMObject.addCOVARIANCE_METHOD(builder, COVARIANCE_METHOD);
    CDMObject.addMANEUVERABLE(builder, MANEUVERABLE);
    CDMObject.addORBIT_CENTER(builder, ORBIT_CENTEROffset);
    CDMObject.addREF_FRAME(builder, REF_FRAME);
    CDMObject.addGRAVITY_MODEL(builder, GRAVITY_MODELOffset);
    CDMObject.addATMOSPHERIC_MODEL(builder, ATMOSPHERIC_MODELOffset);
    CDMObject.addN_BODY_PERTURBATIONS(builder, N_BODY_PERTURBATIONSOffset);
    CDMObject.addSOLAR_RAD_PRESSURE(builder, SOLAR_RAD_PRESSURE);
    CDMObject.addEARTH_TIDES(builder, EARTH_TIDES);
    CDMObject.addINTRACK_THRUST(builder, INTRACK_THRUST);
    CDMObject.addTIME_LASTOB_START(builder, TIME_LASTOB_STARTOffset);
    CDMObject.addTIME_LASTOB_END(builder, TIME_LASTOB_ENDOffset);
    CDMObject.addRECOMMENDED_OD_SPAN(builder, RECOMMENDED_OD_SPAN);
    CDMObject.addACTUAL_OD_SPAN(builder, ACTUAL_OD_SPAN);
    CDMObject.addOBS_AVAILABLE(builder, OBS_AVAILABLE);
    CDMObject.addOBS_USED(builder, OBS_USED);
    CDMObject.addTRACKS_AVAILABLE(builder, TRACKS_AVAILABLE);
    CDMObject.addTRACKS_USED(builder, TRACKS_USED);
    CDMObject.addRESIDUALS_ACCEPTED(builder, RESIDUALS_ACCEPTED);
    CDMObject.addWEIGHTED_RMS(builder, WEIGHTED_RMS);
    CDMObject.addAREA_PC(builder, AREA_PC);
    CDMObject.addAREA_DRG(builder, AREA_DRG);
    CDMObject.addAREA_SRP(builder, AREA_SRP);
    CDMObject.addMASS(builder, MASS);
    CDMObject.addCR_AREA_OVER_MASS(builder, CR_AREA_OVER_MASS);
    CDMObject.addTHRUST_ACCELERATION(builder, THRUST_ACCELERATION);
    CDMObject.addSEDR(builder, SEDR);
    CDMObject.addX(builder, X);
    CDMObject.addY(builder, Y);
    CDMObject.addZ(builder, Z);
    CDMObject.addX_DOT(builder, X_DOT);
    CDMObject.addY_DOT(builder, Y_DOT);
    CDMObject.addZ_DOT(builder, Z_DOT);
    CDMObject.addCR_R(builder, CR_R);
    CDMObject.addCT_R(builder, CT_R);
    CDMObject.addCT_T(builder, CT_T);
    CDMObject.addCN_R(builder, CN_R);
    CDMObject.addCN_T(builder, CN_T);
    CDMObject.addCN_N(builder, CN_N);
    CDMObject.addCRDOT_R(builder, CRDOT_R);
    CDMObject.addCRDOT_T(builder, CRDOT_T);
    CDMObject.addCRDOT_N(builder, CRDOT_N);
    CDMObject.addCRDOT_RDOT(builder, CRDOT_RDOT);
    CDMObject.addCTDOT_R(builder, CTDOT_R);
    CDMObject.addCTDOT_T(builder, CTDOT_T);
    CDMObject.addCTDOT_N(builder, CTDOT_N);
    CDMObject.addCTDOT_RDOT(builder, CTDOT_RDOT);
    CDMObject.addCTDOT_TDOT(builder, CTDOT_TDOT);
    CDMObject.addCNDOT_R(builder, CNDOT_R);
    CDMObject.addCNDOT_T(builder, CNDOT_T);
    CDMObject.addCNDOT_N(builder, CNDOT_N);
    CDMObject.addCNDOT_RDOT(builder, CNDOT_RDOT);
    CDMObject.addCNDOT_TDOT(builder, CNDOT_TDOT);
    CDMObject.addCNDOT_NDOT(builder, CNDOT_NDOT);
    CDMObject.addCDRG_R(builder, CDRG_R);
    CDMObject.addCDRG_T(builder, CDRG_T);
    CDMObject.addCDRG_N(builder, CDRG_N);
    CDMObject.addCDRG_RDOT(builder, CDRG_RDOT);
    CDMObject.addCDRG_TDOT(builder, CDRG_TDOT);
    CDMObject.addCDRG_NDOT(builder, CDRG_NDOT);
    CDMObject.addCDRG_DRG(builder, CDRG_DRG);
    CDMObject.addCSRP_R(builder, CSRP_R);
    CDMObject.addCSRP_T(builder, CSRP_T);
    CDMObject.addCSRP_N(builder, CSRP_N);
    CDMObject.addCSRP_RDOT(builder, CSRP_RDOT);
    CDMObject.addCSRP_TDOT(builder, CSRP_TDOT);
    CDMObject.addCSRP_NDOT(builder, CSRP_NDOT);
    CDMObject.addCSRP_DRG(builder, CSRP_DRG);
    CDMObject.addCSRP_SRP(builder, CSRP_SRP);
    CDMObject.addCTHR_R(builder, CTHR_R);
    CDMObject.addCTHR_T(builder, CTHR_T);
    CDMObject.addCTHR_N(builder, CTHR_N);
    CDMObject.addCTHR_RDOT(builder, CTHR_RDOT);
    CDMObject.addCTHR_TDOT(builder, CTHR_TDOT);
    CDMObject.addCTHR_NDOT(builder, CTHR_NDOT);
    CDMObject.addCTHR_DRG(builder, CTHR_DRG);
    CDMObject.addCTHR_SRP(builder, CTHR_SRP);
    CDMObject.addCTHR_THR(builder, CTHR_THR);
    return CDMObject.endCDMObject(builder);
  }
  unpack() {
    return new CDMObjectT(
      this.COMMENT(),
      this.OBJECT(),
      this.OBJECT_DESIGNATOR(),
      this.CATALOG_NAME(),
      this.OBJECT_NAME(),
      this.INTERNATIONAL_DESIGNATOR(),
      this.OBJECT_TYPE(),
      this.OPERATOR_CONTACT_POSITION(),
      this.OPERATOR_ORGANIZATION(),
      this.EPHEMERIS_NAME(),
      this.COVARIANCE_METHOD(),
      this.MANEUVERABLE(),
      this.ORBIT_CENTER(),
      this.REF_FRAME(),
      this.GRAVITY_MODEL(),
      this.ATMOSPHERIC_MODEL(),
      this.N_BODY_PERTURBATIONS(),
      this.SOLAR_RAD_PRESSURE(),
      this.EARTH_TIDES(),
      this.INTRACK_THRUST(),
      this.TIME_LASTOB_START(),
      this.TIME_LASTOB_END(),
      this.RECOMMENDED_OD_SPAN(),
      this.ACTUAL_OD_SPAN(),
      this.OBS_AVAILABLE(),
      this.OBS_USED(),
      this.TRACKS_AVAILABLE(),
      this.TRACKS_USED(),
      this.RESIDUALS_ACCEPTED(),
      this.WEIGHTED_RMS(),
      this.AREA_PC(),
      this.AREA_DRG(),
      this.AREA_SRP(),
      this.MASS(),
      this.CR_AREA_OVER_MASS(),
      this.THRUST_ACCELERATION(),
      this.SEDR(),
      this.X(),
      this.Y(),
      this.Z(),
      this.X_DOT(),
      this.Y_DOT(),
      this.Z_DOT(),
      this.CR_R(),
      this.CT_R(),
      this.CT_T(),
      this.CN_R(),
      this.CN_T(),
      this.CN_N(),
      this.CRDOT_R(),
      this.CRDOT_T(),
      this.CRDOT_N(),
      this.CRDOT_RDOT(),
      this.CTDOT_R(),
      this.CTDOT_T(),
      this.CTDOT_N(),
      this.CTDOT_RDOT(),
      this.CTDOT_TDOT(),
      this.CNDOT_R(),
      this.CNDOT_T(),
      this.CNDOT_N(),
      this.CNDOT_RDOT(),
      this.CNDOT_TDOT(),
      this.CNDOT_NDOT(),
      this.CDRG_R(),
      this.CDRG_T(),
      this.CDRG_N(),
      this.CDRG_RDOT(),
      this.CDRG_TDOT(),
      this.CDRG_NDOT(),
      this.CDRG_DRG(),
      this.CSRP_R(),
      this.CSRP_T(),
      this.CSRP_N(),
      this.CSRP_RDOT(),
      this.CSRP_TDOT(),
      this.CSRP_NDOT(),
      this.CSRP_DRG(),
      this.CSRP_SRP(),
      this.CTHR_R(),
      this.CTHR_T(),
      this.CTHR_N(),
      this.CTHR_RDOT(),
      this.CTHR_TDOT(),
      this.CTHR_NDOT(),
      this.CTHR_DRG(),
      this.CTHR_SRP(),
      this.CTHR_THR()
    );
  }
  unpackTo(_o) {
    _o.COMMENT = this.COMMENT();
    _o.OBJECT = this.OBJECT();
    _o.OBJECT_DESIGNATOR = this.OBJECT_DESIGNATOR();
    _o.CATALOG_NAME = this.CATALOG_NAME();
    _o.OBJECT_NAME = this.OBJECT_NAME();
    _o.INTERNATIONAL_DESIGNATOR = this.INTERNATIONAL_DESIGNATOR();
    _o.OBJECT_TYPE = this.OBJECT_TYPE();
    _o.OPERATOR_CONTACT_POSITION = this.OPERATOR_CONTACT_POSITION();
    _o.OPERATOR_ORGANIZATION = this.OPERATOR_ORGANIZATION();
    _o.EPHEMERIS_NAME = this.EPHEMERIS_NAME();
    _o.COVARIANCE_METHOD = this.COVARIANCE_METHOD();
    _o.MANEUVERABLE = this.MANEUVERABLE();
    _o.ORBIT_CENTER = this.ORBIT_CENTER();
    _o.REF_FRAME = this.REF_FRAME();
    _o.GRAVITY_MODEL = this.GRAVITY_MODEL();
    _o.ATMOSPHERIC_MODEL = this.ATMOSPHERIC_MODEL();
    _o.N_BODY_PERTURBATIONS = this.N_BODY_PERTURBATIONS();
    _o.SOLAR_RAD_PRESSURE = this.SOLAR_RAD_PRESSURE();
    _o.EARTH_TIDES = this.EARTH_TIDES();
    _o.INTRACK_THRUST = this.INTRACK_THRUST();
    _o.TIME_LASTOB_START = this.TIME_LASTOB_START();
    _o.TIME_LASTOB_END = this.TIME_LASTOB_END();
    _o.RECOMMENDED_OD_SPAN = this.RECOMMENDED_OD_SPAN();
    _o.ACTUAL_OD_SPAN = this.ACTUAL_OD_SPAN();
    _o.OBS_AVAILABLE = this.OBS_AVAILABLE();
    _o.OBS_USED = this.OBS_USED();
    _o.TRACKS_AVAILABLE = this.TRACKS_AVAILABLE();
    _o.TRACKS_USED = this.TRACKS_USED();
    _o.RESIDUALS_ACCEPTED = this.RESIDUALS_ACCEPTED();
    _o.WEIGHTED_RMS = this.WEIGHTED_RMS();
    _o.AREA_PC = this.AREA_PC();
    _o.AREA_DRG = this.AREA_DRG();
    _o.AREA_SRP = this.AREA_SRP();
    _o.MASS = this.MASS();
    _o.CR_AREA_OVER_MASS = this.CR_AREA_OVER_MASS();
    _o.THRUST_ACCELERATION = this.THRUST_ACCELERATION();
    _o.SEDR = this.SEDR();
    _o.X = this.X();
    _o.Y = this.Y();
    _o.Z = this.Z();
    _o.X_DOT = this.X_DOT();
    _o.Y_DOT = this.Y_DOT();
    _o.Z_DOT = this.Z_DOT();
    _o.CR_R = this.CR_R();
    _o.CT_R = this.CT_R();
    _o.CT_T = this.CT_T();
    _o.CN_R = this.CN_R();
    _o.CN_T = this.CN_T();
    _o.CN_N = this.CN_N();
    _o.CRDOT_R = this.CRDOT_R();
    _o.CRDOT_T = this.CRDOT_T();
    _o.CRDOT_N = this.CRDOT_N();
    _o.CRDOT_RDOT = this.CRDOT_RDOT();
    _o.CTDOT_R = this.CTDOT_R();
    _o.CTDOT_T = this.CTDOT_T();
    _o.CTDOT_N = this.CTDOT_N();
    _o.CTDOT_RDOT = this.CTDOT_RDOT();
    _o.CTDOT_TDOT = this.CTDOT_TDOT();
    _o.CNDOT_R = this.CNDOT_R();
    _o.CNDOT_T = this.CNDOT_T();
    _o.CNDOT_N = this.CNDOT_N();
    _o.CNDOT_RDOT = this.CNDOT_RDOT();
    _o.CNDOT_TDOT = this.CNDOT_TDOT();
    _o.CNDOT_NDOT = this.CNDOT_NDOT();
    _o.CDRG_R = this.CDRG_R();
    _o.CDRG_T = this.CDRG_T();
    _o.CDRG_N = this.CDRG_N();
    _o.CDRG_RDOT = this.CDRG_RDOT();
    _o.CDRG_TDOT = this.CDRG_TDOT();
    _o.CDRG_NDOT = this.CDRG_NDOT();
    _o.CDRG_DRG = this.CDRG_DRG();
    _o.CSRP_R = this.CSRP_R();
    _o.CSRP_T = this.CSRP_T();
    _o.CSRP_N = this.CSRP_N();
    _o.CSRP_RDOT = this.CSRP_RDOT();
    _o.CSRP_TDOT = this.CSRP_TDOT();
    _o.CSRP_NDOT = this.CSRP_NDOT();
    _o.CSRP_DRG = this.CSRP_DRG();
    _o.CSRP_SRP = this.CSRP_SRP();
    _o.CTHR_R = this.CTHR_R();
    _o.CTHR_T = this.CTHR_T();
    _o.CTHR_N = this.CTHR_N();
    _o.CTHR_RDOT = this.CTHR_RDOT();
    _o.CTHR_TDOT = this.CTHR_TDOT();
    _o.CTHR_NDOT = this.CTHR_NDOT();
    _o.CTHR_DRG = this.CTHR_DRG();
    _o.CTHR_SRP = this.CTHR_SRP();
    _o.CTHR_THR = this.CTHR_THR();
  }
}
class CDMObjectT {
  constructor(COMMENT = null, OBJECT = import_objectNumber.objectNumber.OBJECT1, OBJECT_DESIGNATOR = null, CATALOG_NAME = null, OBJECT_NAME = null, INTERNATIONAL_DESIGNATOR = null, OBJECT_TYPE = import_objectType.objectType.PAYLOAD, OPERATOR_CONTACT_POSITION = null, OPERATOR_ORGANIZATION = null, EPHEMERIS_NAME = null, COVARIANCE_METHOD = import_covarianceMethod.covarianceMethod.CALCULATED, MANEUVERABLE = import_maneuverableType.maneuverableType.YES, ORBIT_CENTER = null, REF_FRAME = import_referenceFrame.referenceFrame.EME2000, GRAVITY_MODEL = null, ATMOSPHERIC_MODEL = null, N_BODY_PERTURBATIONS = null, SOLAR_RAD_PRESSURE = false, EARTH_TIDES = false, INTRACK_THRUST = false, TIME_LASTOB_START = null, TIME_LASTOB_END = null, RECOMMENDED_OD_SPAN = 0, ACTUAL_OD_SPAN = 0, OBS_AVAILABLE = 0, OBS_USED = 0, TRACKS_AVAILABLE = 0, TRACKS_USED = 0, RESIDUALS_ACCEPTED = 0, WEIGHTED_RMS = 0, AREA_PC = 0, AREA_DRG = 0, AREA_SRP = 0, MASS = 0, CR_AREA_OVER_MASS = 0, THRUST_ACCELERATION = 0, SEDR = 0, X = 0, Y = 0, Z = 0, X_DOT = 0, Y_DOT = 0, Z_DOT = 0, CR_R = 0, CT_R = 0, CT_T = 0, CN_R = 0, CN_T = 0, CN_N = 0, CRDOT_R = 0, CRDOT_T = 0, CRDOT_N = 0, CRDOT_RDOT = 0, CTDOT_R = 0, CTDOT_T = 0, CTDOT_N = 0, CTDOT_RDOT = 0, CTDOT_TDOT = 0, CNDOT_R = 0, CNDOT_T = 0, CNDOT_N = 0, CNDOT_RDOT = 0, CNDOT_TDOT = 0, CNDOT_NDOT = 0, CDRG_R = 0, CDRG_T = 0, CDRG_N = 0, CDRG_RDOT = 0, CDRG_TDOT = 0, CDRG_NDOT = 0, CDRG_DRG = 0, CSRP_R = 0, CSRP_T = 0, CSRP_N = 0, CSRP_RDOT = 0, CSRP_TDOT = 0, CSRP_NDOT = 0, CSRP_DRG = 0, CSRP_SRP = 0, CTHR_R = 0, CTHR_T = 0, CTHR_N = 0, CTHR_RDOT = 0, CTHR_TDOT = 0, CTHR_NDOT = 0, CTHR_DRG = 0, CTHR_SRP = 0, CTHR_THR = 0) {
    this.COMMENT = COMMENT;
    this.OBJECT = OBJECT;
    this.OBJECT_DESIGNATOR = OBJECT_DESIGNATOR;
    this.CATALOG_NAME = CATALOG_NAME;
    this.OBJECT_NAME = OBJECT_NAME;
    this.INTERNATIONAL_DESIGNATOR = INTERNATIONAL_DESIGNATOR;
    this.OBJECT_TYPE = OBJECT_TYPE;
    this.OPERATOR_CONTACT_POSITION = OPERATOR_CONTACT_POSITION;
    this.OPERATOR_ORGANIZATION = OPERATOR_ORGANIZATION;
    this.EPHEMERIS_NAME = EPHEMERIS_NAME;
    this.COVARIANCE_METHOD = COVARIANCE_METHOD;
    this.MANEUVERABLE = MANEUVERABLE;
    this.ORBIT_CENTER = ORBIT_CENTER;
    this.REF_FRAME = REF_FRAME;
    this.GRAVITY_MODEL = GRAVITY_MODEL;
    this.ATMOSPHERIC_MODEL = ATMOSPHERIC_MODEL;
    this.N_BODY_PERTURBATIONS = N_BODY_PERTURBATIONS;
    this.SOLAR_RAD_PRESSURE = SOLAR_RAD_PRESSURE;
    this.EARTH_TIDES = EARTH_TIDES;
    this.INTRACK_THRUST = INTRACK_THRUST;
    this.TIME_LASTOB_START = TIME_LASTOB_START;
    this.TIME_LASTOB_END = TIME_LASTOB_END;
    this.RECOMMENDED_OD_SPAN = RECOMMENDED_OD_SPAN;
    this.ACTUAL_OD_SPAN = ACTUAL_OD_SPAN;
    this.OBS_AVAILABLE = OBS_AVAILABLE;
    this.OBS_USED = OBS_USED;
    this.TRACKS_AVAILABLE = TRACKS_AVAILABLE;
    this.TRACKS_USED = TRACKS_USED;
    this.RESIDUALS_ACCEPTED = RESIDUALS_ACCEPTED;
    this.WEIGHTED_RMS = WEIGHTED_RMS;
    this.AREA_PC = AREA_PC;
    this.AREA_DRG = AREA_DRG;
    this.AREA_SRP = AREA_SRP;
    this.MASS = MASS;
    this.CR_AREA_OVER_MASS = CR_AREA_OVER_MASS;
    this.THRUST_ACCELERATION = THRUST_ACCELERATION;
    this.SEDR = SEDR;
    this.X = X;
    this.Y = Y;
    this.Z = Z;
    this.X_DOT = X_DOT;
    this.Y_DOT = Y_DOT;
    this.Z_DOT = Z_DOT;
    this.CR_R = CR_R;
    this.CT_R = CT_R;
    this.CT_T = CT_T;
    this.CN_R = CN_R;
    this.CN_T = CN_T;
    this.CN_N = CN_N;
    this.CRDOT_R = CRDOT_R;
    this.CRDOT_T = CRDOT_T;
    this.CRDOT_N = CRDOT_N;
    this.CRDOT_RDOT = CRDOT_RDOT;
    this.CTDOT_R = CTDOT_R;
    this.CTDOT_T = CTDOT_T;
    this.CTDOT_N = CTDOT_N;
    this.CTDOT_RDOT = CTDOT_RDOT;
    this.CTDOT_TDOT = CTDOT_TDOT;
    this.CNDOT_R = CNDOT_R;
    this.CNDOT_T = CNDOT_T;
    this.CNDOT_N = CNDOT_N;
    this.CNDOT_RDOT = CNDOT_RDOT;
    this.CNDOT_TDOT = CNDOT_TDOT;
    this.CNDOT_NDOT = CNDOT_NDOT;
    this.CDRG_R = CDRG_R;
    this.CDRG_T = CDRG_T;
    this.CDRG_N = CDRG_N;
    this.CDRG_RDOT = CDRG_RDOT;
    this.CDRG_TDOT = CDRG_TDOT;
    this.CDRG_NDOT = CDRG_NDOT;
    this.CDRG_DRG = CDRG_DRG;
    this.CSRP_R = CSRP_R;
    this.CSRP_T = CSRP_T;
    this.CSRP_N = CSRP_N;
    this.CSRP_RDOT = CSRP_RDOT;
    this.CSRP_TDOT = CSRP_TDOT;
    this.CSRP_NDOT = CSRP_NDOT;
    this.CSRP_DRG = CSRP_DRG;
    this.CSRP_SRP = CSRP_SRP;
    this.CTHR_R = CTHR_R;
    this.CTHR_T = CTHR_T;
    this.CTHR_N = CTHR_N;
    this.CTHR_RDOT = CTHR_RDOT;
    this.CTHR_TDOT = CTHR_TDOT;
    this.CTHR_NDOT = CTHR_NDOT;
    this.CTHR_DRG = CTHR_DRG;
    this.CTHR_SRP = CTHR_SRP;
    this.CTHR_THR = CTHR_THR;
  }
  pack(builder) {
    const COMMENT = this.COMMENT !== null ? builder.createString(this.COMMENT) : 0;
    const OBJECT_DESIGNATOR = this.OBJECT_DESIGNATOR !== null ? builder.createString(this.OBJECT_DESIGNATOR) : 0;
    const CATALOG_NAME = this.CATALOG_NAME !== null ? builder.createString(this.CATALOG_NAME) : 0;
    const OBJECT_NAME = this.OBJECT_NAME !== null ? builder.createString(this.OBJECT_NAME) : 0;
    const INTERNATIONAL_DESIGNATOR = this.INTERNATIONAL_DESIGNATOR !== null ? builder.createString(this.INTERNATIONAL_DESIGNATOR) : 0;
    const OPERATOR_CONTACT_POSITION = this.OPERATOR_CONTACT_POSITION !== null ? builder.createString(this.OPERATOR_CONTACT_POSITION) : 0;
    const OPERATOR_ORGANIZATION = this.OPERATOR_ORGANIZATION !== null ? builder.createString(this.OPERATOR_ORGANIZATION) : 0;
    const EPHEMERIS_NAME = this.EPHEMERIS_NAME !== null ? builder.createString(this.EPHEMERIS_NAME) : 0;
    const ORBIT_CENTER = this.ORBIT_CENTER !== null ? builder.createString(this.ORBIT_CENTER) : 0;
    const GRAVITY_MODEL = this.GRAVITY_MODEL !== null ? builder.createString(this.GRAVITY_MODEL) : 0;
    const ATMOSPHERIC_MODEL = this.ATMOSPHERIC_MODEL !== null ? builder.createString(this.ATMOSPHERIC_MODEL) : 0;
    const N_BODY_PERTURBATIONS = this.N_BODY_PERTURBATIONS !== null ? builder.createString(this.N_BODY_PERTURBATIONS) : 0;
    const TIME_LASTOB_START = this.TIME_LASTOB_START !== null ? builder.createString(this.TIME_LASTOB_START) : 0;
    const TIME_LASTOB_END = this.TIME_LASTOB_END !== null ? builder.createString(this.TIME_LASTOB_END) : 0;
    return CDMObject.createCDMObject(
      builder,
      COMMENT,
      this.OBJECT,
      OBJECT_DESIGNATOR,
      CATALOG_NAME,
      OBJECT_NAME,
      INTERNATIONAL_DESIGNATOR,
      this.OBJECT_TYPE,
      OPERATOR_CONTACT_POSITION,
      OPERATOR_ORGANIZATION,
      EPHEMERIS_NAME,
      this.COVARIANCE_METHOD,
      this.MANEUVERABLE,
      ORBIT_CENTER,
      this.REF_FRAME,
      GRAVITY_MODEL,
      ATMOSPHERIC_MODEL,
      N_BODY_PERTURBATIONS,
      this.SOLAR_RAD_PRESSURE,
      this.EARTH_TIDES,
      this.INTRACK_THRUST,
      TIME_LASTOB_START,
      TIME_LASTOB_END,
      this.RECOMMENDED_OD_SPAN,
      this.ACTUAL_OD_SPAN,
      this.OBS_AVAILABLE,
      this.OBS_USED,
      this.TRACKS_AVAILABLE,
      this.TRACKS_USED,
      this.RESIDUALS_ACCEPTED,
      this.WEIGHTED_RMS,
      this.AREA_PC,
      this.AREA_DRG,
      this.AREA_SRP,
      this.MASS,
      this.CR_AREA_OVER_MASS,
      this.THRUST_ACCELERATION,
      this.SEDR,
      this.X,
      this.Y,
      this.Z,
      this.X_DOT,
      this.Y_DOT,
      this.Z_DOT,
      this.CR_R,
      this.CT_R,
      this.CT_T,
      this.CN_R,
      this.CN_T,
      this.CN_N,
      this.CRDOT_R,
      this.CRDOT_T,
      this.CRDOT_N,
      this.CRDOT_RDOT,
      this.CTDOT_R,
      this.CTDOT_T,
      this.CTDOT_N,
      this.CTDOT_RDOT,
      this.CTDOT_TDOT,
      this.CNDOT_R,
      this.CNDOT_T,
      this.CNDOT_N,
      this.CNDOT_RDOT,
      this.CNDOT_TDOT,
      this.CNDOT_NDOT,
      this.CDRG_R,
      this.CDRG_T,
      this.CDRG_N,
      this.CDRG_RDOT,
      this.CDRG_TDOT,
      this.CDRG_NDOT,
      this.CDRG_DRG,
      this.CSRP_R,
      this.CSRP_T,
      this.CSRP_N,
      this.CSRP_RDOT,
      this.CSRP_TDOT,
      this.CSRP_NDOT,
      this.CSRP_DRG,
      this.CSRP_SRP,
      this.CTHR_R,
      this.CTHR_T,
      this.CTHR_N,
      this.CTHR_RDOT,
      this.CTHR_TDOT,
      this.CTHR_NDOT,
      this.CTHR_DRG,
      this.CTHR_SRP,
      this.CTHR_THR
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CDMObject,
  CDMObjectT
});

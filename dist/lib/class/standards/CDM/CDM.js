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
var CDM_exports = {};
__export(CDM_exports, {
  CDM: () => CDM,
  CDMT: () => CDMT
});
module.exports = __toCommonJS(CDM_exports);
var flatbuffers = __toESM(require("flatbuffers"));
var import_CDMObject = require("./CDMObject");
var import_objectCenteredReferenceFrame = require("./objectCenteredReferenceFrame");
var import_screeningVolumeShape = require("./screeningVolumeShape");
class CDM {
  bb = null;
  bb_pos = 0;
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsCDM(bb, obj) {
    return (obj || new CDM()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsCDM(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new CDM()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static bufferHasIdentifier(bb) {
    return bb.__has_identifier("$CDM");
  }
  CCSDS_CDM_VERS() {
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
  MESSAGE_FOR(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  MESSAGE_ID(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  TCA(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  MISS_DISTANCE() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  RELATIVE_SPEED() {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  RELATIVE_POSITION_R() {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  RELATIVE_POSITION_T() {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  RELATIVE_POSITION_N() {
    const offset = this.bb.__offset(this.bb_pos, 24);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  RELATIVE_VELOCITY_R() {
    const offset = this.bb.__offset(this.bb_pos, 26);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  RELATIVE_VELOCITY_T() {
    const offset = this.bb.__offset(this.bb_pos, 28);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  RELATIVE_VELOCITY_N() {
    const offset = this.bb.__offset(this.bb_pos, 30);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  START_SCREEN_PERIOD(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 32);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  STOP_SCREEN_PERIOD(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 34);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  SCREEN_VOLUME_FRAME() {
    const offset = this.bb.__offset(this.bb_pos, 36);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_objectCenteredReferenceFrame.objectCenteredReferenceFrame.RTN;
  }
  SCREEN_VOLUME_SHAPE() {
    const offset = this.bb.__offset(this.bb_pos, 38);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_screeningVolumeShape.screeningVolumeShape.ELLIPSOID;
  }
  SCREEN_VOLUME_X() {
    const offset = this.bb.__offset(this.bb_pos, 40);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  SCREEN_VOLUME_Y() {
    const offset = this.bb.__offset(this.bb_pos, 42);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  SCREEN_VOLUME_Z() {
    const offset = this.bb.__offset(this.bb_pos, 44);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  SCREEN_ENTRY_TIME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 46);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  SCREEN_EXIT_TIME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 48);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  COLLISION_PROBABILITY() {
    const offset = this.bb.__offset(this.bb_pos, 50);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  COLLISION_PROBABILITY_METHOD(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 52);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  OBJECT1(obj) {
    const offset = this.bb.__offset(this.bb_pos, 54);
    return offset ? (obj || new import_CDMObject.CDMObject()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  OBJECT2(obj) {
    const offset = this.bb.__offset(this.bb_pos, 56);
    return offset ? (obj || new import_CDMObject.CDMObject()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  static startCDM(builder) {
    builder.startObject(27);
  }
  static addCCSDS_CDM_VERS(builder, CCSDS_CDM_VERS) {
    builder.addFieldFloat64(0, CCSDS_CDM_VERS, 0);
  }
  static addCREATION_DATE(builder, CREATION_DATEOffset) {
    builder.addFieldOffset(1, CREATION_DATEOffset, 0);
  }
  static addORIGINATOR(builder, ORIGINATOROffset) {
    builder.addFieldOffset(2, ORIGINATOROffset, 0);
  }
  static addMESSAGE_FOR(builder, MESSAGE_FOROffset) {
    builder.addFieldOffset(3, MESSAGE_FOROffset, 0);
  }
  static addMESSAGE_ID(builder, MESSAGE_IDOffset) {
    builder.addFieldOffset(4, MESSAGE_IDOffset, 0);
  }
  static addTCA(builder, TCAOffset) {
    builder.addFieldOffset(5, TCAOffset, 0);
  }
  static addMISS_DISTANCE(builder, MISS_DISTANCE) {
    builder.addFieldFloat64(6, MISS_DISTANCE, 0);
  }
  static addRELATIVE_SPEED(builder, RELATIVE_SPEED) {
    builder.addFieldFloat64(7, RELATIVE_SPEED, 0);
  }
  static addRELATIVE_POSITION_R(builder, RELATIVE_POSITION_R) {
    builder.addFieldFloat64(8, RELATIVE_POSITION_R, 0);
  }
  static addRELATIVE_POSITION_T(builder, RELATIVE_POSITION_T) {
    builder.addFieldFloat64(9, RELATIVE_POSITION_T, 0);
  }
  static addRELATIVE_POSITION_N(builder, RELATIVE_POSITION_N) {
    builder.addFieldFloat64(10, RELATIVE_POSITION_N, 0);
  }
  static addRELATIVE_VELOCITY_R(builder, RELATIVE_VELOCITY_R) {
    builder.addFieldFloat64(11, RELATIVE_VELOCITY_R, 0);
  }
  static addRELATIVE_VELOCITY_T(builder, RELATIVE_VELOCITY_T) {
    builder.addFieldFloat64(12, RELATIVE_VELOCITY_T, 0);
  }
  static addRELATIVE_VELOCITY_N(builder, RELATIVE_VELOCITY_N) {
    builder.addFieldFloat64(13, RELATIVE_VELOCITY_N, 0);
  }
  static addSTART_SCREEN_PERIOD(builder, START_SCREEN_PERIODOffset) {
    builder.addFieldOffset(14, START_SCREEN_PERIODOffset, 0);
  }
  static addSTOP_SCREEN_PERIOD(builder, STOP_SCREEN_PERIODOffset) {
    builder.addFieldOffset(15, STOP_SCREEN_PERIODOffset, 0);
  }
  static addSCREEN_VOLUME_FRAME(builder, SCREEN_VOLUME_FRAME) {
    builder.addFieldInt8(16, SCREEN_VOLUME_FRAME, import_objectCenteredReferenceFrame.objectCenteredReferenceFrame.RTN);
  }
  static addSCREEN_VOLUME_SHAPE(builder, SCREEN_VOLUME_SHAPE) {
    builder.addFieldInt8(17, SCREEN_VOLUME_SHAPE, import_screeningVolumeShape.screeningVolumeShape.ELLIPSOID);
  }
  static addSCREEN_VOLUME_X(builder, SCREEN_VOLUME_X) {
    builder.addFieldFloat64(18, SCREEN_VOLUME_X, 0);
  }
  static addSCREEN_VOLUME_Y(builder, SCREEN_VOLUME_Y) {
    builder.addFieldFloat64(19, SCREEN_VOLUME_Y, 0);
  }
  static addSCREEN_VOLUME_Z(builder, SCREEN_VOLUME_Z) {
    builder.addFieldFloat64(20, SCREEN_VOLUME_Z, 0);
  }
  static addSCREEN_ENTRY_TIME(builder, SCREEN_ENTRY_TIMEOffset) {
    builder.addFieldOffset(21, SCREEN_ENTRY_TIMEOffset, 0);
  }
  static addSCREEN_EXIT_TIME(builder, SCREEN_EXIT_TIMEOffset) {
    builder.addFieldOffset(22, SCREEN_EXIT_TIMEOffset, 0);
  }
  static addCOLLISION_PROBABILITY(builder, COLLISION_PROBABILITY) {
    builder.addFieldFloat64(23, COLLISION_PROBABILITY, 0);
  }
  static addCOLLISION_PROBABILITY_METHOD(builder, COLLISION_PROBABILITY_METHODOffset) {
    builder.addFieldOffset(24, COLLISION_PROBABILITY_METHODOffset, 0);
  }
  static addOBJECT1(builder, OBJECT1Offset) {
    builder.addFieldOffset(25, OBJECT1Offset, 0);
  }
  static addOBJECT2(builder, OBJECT2Offset) {
    builder.addFieldOffset(26, OBJECT2Offset, 0);
  }
  static endCDM(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static finishCDMBuffer(builder, offset) {
    builder.finish(offset, "$CDM");
  }
  static finishSizePrefixedCDMBuffer(builder, offset) {
    builder.finish(offset, "$CDM", true);
  }
  unpack() {
    return new CDMT(
      this.CCSDS_CDM_VERS(),
      this.CREATION_DATE(),
      this.ORIGINATOR(),
      this.MESSAGE_FOR(),
      this.MESSAGE_ID(),
      this.TCA(),
      this.MISS_DISTANCE(),
      this.RELATIVE_SPEED(),
      this.RELATIVE_POSITION_R(),
      this.RELATIVE_POSITION_T(),
      this.RELATIVE_POSITION_N(),
      this.RELATIVE_VELOCITY_R(),
      this.RELATIVE_VELOCITY_T(),
      this.RELATIVE_VELOCITY_N(),
      this.START_SCREEN_PERIOD(),
      this.STOP_SCREEN_PERIOD(),
      this.SCREEN_VOLUME_FRAME(),
      this.SCREEN_VOLUME_SHAPE(),
      this.SCREEN_VOLUME_X(),
      this.SCREEN_VOLUME_Y(),
      this.SCREEN_VOLUME_Z(),
      this.SCREEN_ENTRY_TIME(),
      this.SCREEN_EXIT_TIME(),
      this.COLLISION_PROBABILITY(),
      this.COLLISION_PROBABILITY_METHOD(),
      this.OBJECT1() !== null ? this.OBJECT1().unpack() : null,
      this.OBJECT2() !== null ? this.OBJECT2().unpack() : null
    );
  }
  unpackTo(_o) {
    _o.CCSDS_CDM_VERS = this.CCSDS_CDM_VERS();
    _o.CREATION_DATE = this.CREATION_DATE();
    _o.ORIGINATOR = this.ORIGINATOR();
    _o.MESSAGE_FOR = this.MESSAGE_FOR();
    _o.MESSAGE_ID = this.MESSAGE_ID();
    _o.TCA = this.TCA();
    _o.MISS_DISTANCE = this.MISS_DISTANCE();
    _o.RELATIVE_SPEED = this.RELATIVE_SPEED();
    _o.RELATIVE_POSITION_R = this.RELATIVE_POSITION_R();
    _o.RELATIVE_POSITION_T = this.RELATIVE_POSITION_T();
    _o.RELATIVE_POSITION_N = this.RELATIVE_POSITION_N();
    _o.RELATIVE_VELOCITY_R = this.RELATIVE_VELOCITY_R();
    _o.RELATIVE_VELOCITY_T = this.RELATIVE_VELOCITY_T();
    _o.RELATIVE_VELOCITY_N = this.RELATIVE_VELOCITY_N();
    _o.START_SCREEN_PERIOD = this.START_SCREEN_PERIOD();
    _o.STOP_SCREEN_PERIOD = this.STOP_SCREEN_PERIOD();
    _o.SCREEN_VOLUME_FRAME = this.SCREEN_VOLUME_FRAME();
    _o.SCREEN_VOLUME_SHAPE = this.SCREEN_VOLUME_SHAPE();
    _o.SCREEN_VOLUME_X = this.SCREEN_VOLUME_X();
    _o.SCREEN_VOLUME_Y = this.SCREEN_VOLUME_Y();
    _o.SCREEN_VOLUME_Z = this.SCREEN_VOLUME_Z();
    _o.SCREEN_ENTRY_TIME = this.SCREEN_ENTRY_TIME();
    _o.SCREEN_EXIT_TIME = this.SCREEN_EXIT_TIME();
    _o.COLLISION_PROBABILITY = this.COLLISION_PROBABILITY();
    _o.COLLISION_PROBABILITY_METHOD = this.COLLISION_PROBABILITY_METHOD();
    _o.OBJECT1 = this.OBJECT1() !== null ? this.OBJECT1().unpack() : null;
    _o.OBJECT2 = this.OBJECT2() !== null ? this.OBJECT2().unpack() : null;
  }
}
class CDMT {
  constructor(CCSDS_CDM_VERS = 0, CREATION_DATE = null, ORIGINATOR = null, MESSAGE_FOR = null, MESSAGE_ID = null, TCA = null, MISS_DISTANCE = 0, RELATIVE_SPEED = 0, RELATIVE_POSITION_R = 0, RELATIVE_POSITION_T = 0, RELATIVE_POSITION_N = 0, RELATIVE_VELOCITY_R = 0, RELATIVE_VELOCITY_T = 0, RELATIVE_VELOCITY_N = 0, START_SCREEN_PERIOD = null, STOP_SCREEN_PERIOD = null, SCREEN_VOLUME_FRAME = import_objectCenteredReferenceFrame.objectCenteredReferenceFrame.RTN, SCREEN_VOLUME_SHAPE = import_screeningVolumeShape.screeningVolumeShape.ELLIPSOID, SCREEN_VOLUME_X = 0, SCREEN_VOLUME_Y = 0, SCREEN_VOLUME_Z = 0, SCREEN_ENTRY_TIME = null, SCREEN_EXIT_TIME = null, COLLISION_PROBABILITY = 0, COLLISION_PROBABILITY_METHOD = null, OBJECT1 = null, OBJECT2 = null) {
    this.CCSDS_CDM_VERS = CCSDS_CDM_VERS;
    this.CREATION_DATE = CREATION_DATE;
    this.ORIGINATOR = ORIGINATOR;
    this.MESSAGE_FOR = MESSAGE_FOR;
    this.MESSAGE_ID = MESSAGE_ID;
    this.TCA = TCA;
    this.MISS_DISTANCE = MISS_DISTANCE;
    this.RELATIVE_SPEED = RELATIVE_SPEED;
    this.RELATIVE_POSITION_R = RELATIVE_POSITION_R;
    this.RELATIVE_POSITION_T = RELATIVE_POSITION_T;
    this.RELATIVE_POSITION_N = RELATIVE_POSITION_N;
    this.RELATIVE_VELOCITY_R = RELATIVE_VELOCITY_R;
    this.RELATIVE_VELOCITY_T = RELATIVE_VELOCITY_T;
    this.RELATIVE_VELOCITY_N = RELATIVE_VELOCITY_N;
    this.START_SCREEN_PERIOD = START_SCREEN_PERIOD;
    this.STOP_SCREEN_PERIOD = STOP_SCREEN_PERIOD;
    this.SCREEN_VOLUME_FRAME = SCREEN_VOLUME_FRAME;
    this.SCREEN_VOLUME_SHAPE = SCREEN_VOLUME_SHAPE;
    this.SCREEN_VOLUME_X = SCREEN_VOLUME_X;
    this.SCREEN_VOLUME_Y = SCREEN_VOLUME_Y;
    this.SCREEN_VOLUME_Z = SCREEN_VOLUME_Z;
    this.SCREEN_ENTRY_TIME = SCREEN_ENTRY_TIME;
    this.SCREEN_EXIT_TIME = SCREEN_EXIT_TIME;
    this.COLLISION_PROBABILITY = COLLISION_PROBABILITY;
    this.COLLISION_PROBABILITY_METHOD = COLLISION_PROBABILITY_METHOD;
    this.OBJECT1 = OBJECT1;
    this.OBJECT2 = OBJECT2;
  }
  pack(builder) {
    const CREATION_DATE = this.CREATION_DATE !== null ? builder.createString(this.CREATION_DATE) : 0;
    const ORIGINATOR = this.ORIGINATOR !== null ? builder.createString(this.ORIGINATOR) : 0;
    const MESSAGE_FOR = this.MESSAGE_FOR !== null ? builder.createString(this.MESSAGE_FOR) : 0;
    const MESSAGE_ID = this.MESSAGE_ID !== null ? builder.createString(this.MESSAGE_ID) : 0;
    const TCA = this.TCA !== null ? builder.createString(this.TCA) : 0;
    const START_SCREEN_PERIOD = this.START_SCREEN_PERIOD !== null ? builder.createString(this.START_SCREEN_PERIOD) : 0;
    const STOP_SCREEN_PERIOD = this.STOP_SCREEN_PERIOD !== null ? builder.createString(this.STOP_SCREEN_PERIOD) : 0;
    const SCREEN_ENTRY_TIME = this.SCREEN_ENTRY_TIME !== null ? builder.createString(this.SCREEN_ENTRY_TIME) : 0;
    const SCREEN_EXIT_TIME = this.SCREEN_EXIT_TIME !== null ? builder.createString(this.SCREEN_EXIT_TIME) : 0;
    const COLLISION_PROBABILITY_METHOD = this.COLLISION_PROBABILITY_METHOD !== null ? builder.createString(this.COLLISION_PROBABILITY_METHOD) : 0;
    const OBJECT1 = this.OBJECT1 !== null ? this.OBJECT1.pack(builder) : 0;
    const OBJECT2 = this.OBJECT2 !== null ? this.OBJECT2.pack(builder) : 0;
    CDM.startCDM(builder);
    CDM.addCCSDS_CDM_VERS(builder, this.CCSDS_CDM_VERS);
    CDM.addCREATION_DATE(builder, CREATION_DATE);
    CDM.addORIGINATOR(builder, ORIGINATOR);
    CDM.addMESSAGE_FOR(builder, MESSAGE_FOR);
    CDM.addMESSAGE_ID(builder, MESSAGE_ID);
    CDM.addTCA(builder, TCA);
    CDM.addMISS_DISTANCE(builder, this.MISS_DISTANCE);
    CDM.addRELATIVE_SPEED(builder, this.RELATIVE_SPEED);
    CDM.addRELATIVE_POSITION_R(builder, this.RELATIVE_POSITION_R);
    CDM.addRELATIVE_POSITION_T(builder, this.RELATIVE_POSITION_T);
    CDM.addRELATIVE_POSITION_N(builder, this.RELATIVE_POSITION_N);
    CDM.addRELATIVE_VELOCITY_R(builder, this.RELATIVE_VELOCITY_R);
    CDM.addRELATIVE_VELOCITY_T(builder, this.RELATIVE_VELOCITY_T);
    CDM.addRELATIVE_VELOCITY_N(builder, this.RELATIVE_VELOCITY_N);
    CDM.addSTART_SCREEN_PERIOD(builder, START_SCREEN_PERIOD);
    CDM.addSTOP_SCREEN_PERIOD(builder, STOP_SCREEN_PERIOD);
    CDM.addSCREEN_VOLUME_FRAME(builder, this.SCREEN_VOLUME_FRAME);
    CDM.addSCREEN_VOLUME_SHAPE(builder, this.SCREEN_VOLUME_SHAPE);
    CDM.addSCREEN_VOLUME_X(builder, this.SCREEN_VOLUME_X);
    CDM.addSCREEN_VOLUME_Y(builder, this.SCREEN_VOLUME_Y);
    CDM.addSCREEN_VOLUME_Z(builder, this.SCREEN_VOLUME_Z);
    CDM.addSCREEN_ENTRY_TIME(builder, SCREEN_ENTRY_TIME);
    CDM.addSCREEN_EXIT_TIME(builder, SCREEN_EXIT_TIME);
    CDM.addCOLLISION_PROBABILITY(builder, this.COLLISION_PROBABILITY);
    CDM.addCOLLISION_PROBABILITY_METHOD(builder, COLLISION_PROBABILITY_METHOD);
    CDM.addOBJECT1(builder, OBJECT1);
    CDM.addOBJECT2(builder, OBJECT2);
    return CDM.endCDM(builder);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CDM,
  CDMT
});

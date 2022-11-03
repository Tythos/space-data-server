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
var SATCAT_exports = {};
__export(SATCAT_exports, {
  SATCAT: () => SATCAT,
  SATCATT: () => SATCATT
});
module.exports = __toCommonJS(SATCAT_exports);
var flatbuffers = __toESM(require("flatbuffers"));
var import_dataStatusCode = require("./dataStatusCode");
var import_massType = require("./massType");
var import_objectType = require("./objectType");
var import_opsStatusCode = require("./opsStatusCode");
var import_orbitType = require("./orbitType");
class SATCAT {
  bb = null;
  bb_pos = 0;
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsSATCAT(bb, obj) {
    return (obj || new SATCAT()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsSATCAT(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new SATCAT()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static bufferHasIdentifier(bb) {
    return bb.__has_identifier("$SAT");
  }
  OBJECT_NAME(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  OBJECT_ID(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  NORAD_CAT_ID() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
  }
  OBJECT_TYPE() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_objectType.objectType.UNKNOWN;
  }
  OPS_STATUS_CODE() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_opsStatusCode.opsStatusCode.UNKNOWN;
  }
  OWNER(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  LAUNCH_DATE(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  LAUNCH_SITE(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  DECAY_DATE(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  PERIOD() {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  INCLINATION() {
    const offset = this.bb.__offset(this.bb_pos, 24);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  APOGEE() {
    const offset = this.bb.__offset(this.bb_pos, 26);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  PERIGEE() {
    const offset = this.bb.__offset(this.bb_pos, 28);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  RCS() {
    const offset = this.bb.__offset(this.bb_pos, 30);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  DATA_STATUS_CODE() {
    const offset = this.bb.__offset(this.bb_pos, 32);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_dataStatusCode.dataStatusCode.NO_CURRENT_ELEMENTS;
  }
  ORBIT_CENTER(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 34);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  ORBIT_TYPE() {
    const offset = this.bb.__offset(this.bb_pos, 36);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_orbitType.orbitType.ORBIT;
  }
  DEPLOYMENT_DATE(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 38);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  MANEUVERABLE() {
    const offset = this.bb.__offset(this.bb_pos, 40);
    return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
  }
  SIZE() {
    const offset = this.bb.__offset(this.bb_pos, 42);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  MASS() {
    const offset = this.bb.__offset(this.bb_pos, 44);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  MASS_TYPE() {
    const offset = this.bb.__offset(this.bb_pos, 46);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : import_massType.massType.DRY;
  }
  static startSATCAT(builder) {
    builder.startObject(22);
  }
  static addOBJECT_NAME(builder, OBJECT_NAMEOffset) {
    builder.addFieldOffset(0, OBJECT_NAMEOffset, 0);
  }
  static addOBJECT_ID(builder, OBJECT_IDOffset) {
    builder.addFieldOffset(1, OBJECT_IDOffset, 0);
  }
  static addNORAD_CAT_ID(builder, NORAD_CAT_ID) {
    builder.addFieldInt32(2, NORAD_CAT_ID, 0);
  }
  static addOBJECT_TYPE(builder, OBJECT_TYPE) {
    builder.addFieldInt8(3, OBJECT_TYPE, import_objectType.objectType.UNKNOWN);
  }
  static addOPS_STATUS_CODE(builder, OPS_STATUS_CODE) {
    builder.addFieldInt8(4, OPS_STATUS_CODE, import_opsStatusCode.opsStatusCode.UNKNOWN);
  }
  static addOWNER(builder, OWNEROffset) {
    builder.addFieldOffset(5, OWNEROffset, 0);
  }
  static addLAUNCH_DATE(builder, LAUNCH_DATEOffset) {
    builder.addFieldOffset(6, LAUNCH_DATEOffset, 0);
  }
  static addLAUNCH_SITE(builder, LAUNCH_SITEOffset) {
    builder.addFieldOffset(7, LAUNCH_SITEOffset, 0);
  }
  static addDECAY_DATE(builder, DECAY_DATEOffset) {
    builder.addFieldOffset(8, DECAY_DATEOffset, 0);
  }
  static addPERIOD(builder, PERIOD) {
    builder.addFieldFloat64(9, PERIOD, 0);
  }
  static addINCLINATION(builder, INCLINATION) {
    builder.addFieldFloat64(10, INCLINATION, 0);
  }
  static addAPOGEE(builder, APOGEE) {
    builder.addFieldFloat64(11, APOGEE, 0);
  }
  static addPERIGEE(builder, PERIGEE) {
    builder.addFieldFloat64(12, PERIGEE, 0);
  }
  static addRCS(builder, RCS) {
    builder.addFieldFloat64(13, RCS, 0);
  }
  static addDATA_STATUS_CODE(builder, DATA_STATUS_CODE) {
    builder.addFieldInt8(14, DATA_STATUS_CODE, import_dataStatusCode.dataStatusCode.NO_CURRENT_ELEMENTS);
  }
  static addORBIT_CENTER(builder, ORBIT_CENTEROffset) {
    builder.addFieldOffset(15, ORBIT_CENTEROffset, 0);
  }
  static addORBIT_TYPE(builder, ORBIT_TYPE) {
    builder.addFieldInt8(16, ORBIT_TYPE, import_orbitType.orbitType.ORBIT);
  }
  static addDEPLOYMENT_DATE(builder, DEPLOYMENT_DATEOffset) {
    builder.addFieldOffset(17, DEPLOYMENT_DATEOffset, 0);
  }
  static addMANEUVERABLE(builder, MANEUVERABLE) {
    builder.addFieldInt8(18, +MANEUVERABLE, 0);
  }
  static addSIZE(builder, SIZE) {
    builder.addFieldFloat64(19, SIZE, 0);
  }
  static addMASS(builder, MASS) {
    builder.addFieldFloat64(20, MASS, 0);
  }
  static addMASS_TYPE(builder, MASS_TYPE) {
    builder.addFieldInt8(21, MASS_TYPE, import_massType.massType.DRY);
  }
  static endSATCAT(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static finishSATCATBuffer(builder, offset) {
    builder.finish(offset, "$SAT");
  }
  static finishSizePrefixedSATCATBuffer(builder, offset) {
    builder.finish(offset, "$SAT", true);
  }
  static createSATCAT(builder, OBJECT_NAMEOffset, OBJECT_IDOffset, NORAD_CAT_ID, OBJECT_TYPE, OPS_STATUS_CODE, OWNEROffset, LAUNCH_DATEOffset, LAUNCH_SITEOffset, DECAY_DATEOffset, PERIOD, INCLINATION, APOGEE, PERIGEE, RCS, DATA_STATUS_CODE, ORBIT_CENTEROffset, ORBIT_TYPE, DEPLOYMENT_DATEOffset, MANEUVERABLE, SIZE, MASS, MASS_TYPE) {
    SATCAT.startSATCAT(builder);
    SATCAT.addOBJECT_NAME(builder, OBJECT_NAMEOffset);
    SATCAT.addOBJECT_ID(builder, OBJECT_IDOffset);
    SATCAT.addNORAD_CAT_ID(builder, NORAD_CAT_ID);
    SATCAT.addOBJECT_TYPE(builder, OBJECT_TYPE);
    SATCAT.addOPS_STATUS_CODE(builder, OPS_STATUS_CODE);
    SATCAT.addOWNER(builder, OWNEROffset);
    SATCAT.addLAUNCH_DATE(builder, LAUNCH_DATEOffset);
    SATCAT.addLAUNCH_SITE(builder, LAUNCH_SITEOffset);
    SATCAT.addDECAY_DATE(builder, DECAY_DATEOffset);
    SATCAT.addPERIOD(builder, PERIOD);
    SATCAT.addINCLINATION(builder, INCLINATION);
    SATCAT.addAPOGEE(builder, APOGEE);
    SATCAT.addPERIGEE(builder, PERIGEE);
    SATCAT.addRCS(builder, RCS);
    SATCAT.addDATA_STATUS_CODE(builder, DATA_STATUS_CODE);
    SATCAT.addORBIT_CENTER(builder, ORBIT_CENTEROffset);
    SATCAT.addORBIT_TYPE(builder, ORBIT_TYPE);
    SATCAT.addDEPLOYMENT_DATE(builder, DEPLOYMENT_DATEOffset);
    SATCAT.addMANEUVERABLE(builder, MANEUVERABLE);
    SATCAT.addSIZE(builder, SIZE);
    SATCAT.addMASS(builder, MASS);
    SATCAT.addMASS_TYPE(builder, MASS_TYPE);
    return SATCAT.endSATCAT(builder);
  }
  unpack() {
    return new SATCATT(
      this.OBJECT_NAME(),
      this.OBJECT_ID(),
      this.NORAD_CAT_ID(),
      this.OBJECT_TYPE(),
      this.OPS_STATUS_CODE(),
      this.OWNER(),
      this.LAUNCH_DATE(),
      this.LAUNCH_SITE(),
      this.DECAY_DATE(),
      this.PERIOD(),
      this.INCLINATION(),
      this.APOGEE(),
      this.PERIGEE(),
      this.RCS(),
      this.DATA_STATUS_CODE(),
      this.ORBIT_CENTER(),
      this.ORBIT_TYPE(),
      this.DEPLOYMENT_DATE(),
      this.MANEUVERABLE(),
      this.SIZE(),
      this.MASS(),
      this.MASS_TYPE()
    );
  }
  unpackTo(_o) {
    _o.OBJECT_NAME = this.OBJECT_NAME();
    _o.OBJECT_ID = this.OBJECT_ID();
    _o.NORAD_CAT_ID = this.NORAD_CAT_ID();
    _o.OBJECT_TYPE = this.OBJECT_TYPE();
    _o.OPS_STATUS_CODE = this.OPS_STATUS_CODE();
    _o.OWNER = this.OWNER();
    _o.LAUNCH_DATE = this.LAUNCH_DATE();
    _o.LAUNCH_SITE = this.LAUNCH_SITE();
    _o.DECAY_DATE = this.DECAY_DATE();
    _o.PERIOD = this.PERIOD();
    _o.INCLINATION = this.INCLINATION();
    _o.APOGEE = this.APOGEE();
    _o.PERIGEE = this.PERIGEE();
    _o.RCS = this.RCS();
    _o.DATA_STATUS_CODE = this.DATA_STATUS_CODE();
    _o.ORBIT_CENTER = this.ORBIT_CENTER();
    _o.ORBIT_TYPE = this.ORBIT_TYPE();
    _o.DEPLOYMENT_DATE = this.DEPLOYMENT_DATE();
    _o.MANEUVERABLE = this.MANEUVERABLE();
    _o.SIZE = this.SIZE();
    _o.MASS = this.MASS();
    _o.MASS_TYPE = this.MASS_TYPE();
  }
}
class SATCATT {
  constructor(OBJECT_NAME = null, OBJECT_ID = null, NORAD_CAT_ID = 0, OBJECT_TYPE = import_objectType.objectType.UNKNOWN, OPS_STATUS_CODE = import_opsStatusCode.opsStatusCode.UNKNOWN, OWNER = null, LAUNCH_DATE = null, LAUNCH_SITE = null, DECAY_DATE = null, PERIOD = 0, INCLINATION = 0, APOGEE = 0, PERIGEE = 0, RCS = 0, DATA_STATUS_CODE = import_dataStatusCode.dataStatusCode.NO_CURRENT_ELEMENTS, ORBIT_CENTER = null, ORBIT_TYPE = import_orbitType.orbitType.ORBIT, DEPLOYMENT_DATE = null, MANEUVERABLE = false, SIZE = 0, MASS = 0, MASS_TYPE = import_massType.massType.DRY) {
    this.OBJECT_NAME = OBJECT_NAME;
    this.OBJECT_ID = OBJECT_ID;
    this.NORAD_CAT_ID = NORAD_CAT_ID;
    this.OBJECT_TYPE = OBJECT_TYPE;
    this.OPS_STATUS_CODE = OPS_STATUS_CODE;
    this.OWNER = OWNER;
    this.LAUNCH_DATE = LAUNCH_DATE;
    this.LAUNCH_SITE = LAUNCH_SITE;
    this.DECAY_DATE = DECAY_DATE;
    this.PERIOD = PERIOD;
    this.INCLINATION = INCLINATION;
    this.APOGEE = APOGEE;
    this.PERIGEE = PERIGEE;
    this.RCS = RCS;
    this.DATA_STATUS_CODE = DATA_STATUS_CODE;
    this.ORBIT_CENTER = ORBIT_CENTER;
    this.ORBIT_TYPE = ORBIT_TYPE;
    this.DEPLOYMENT_DATE = DEPLOYMENT_DATE;
    this.MANEUVERABLE = MANEUVERABLE;
    this.SIZE = SIZE;
    this.MASS = MASS;
    this.MASS_TYPE = MASS_TYPE;
  }
  pack(builder) {
    const OBJECT_NAME = this.OBJECT_NAME !== null ? builder.createString(this.OBJECT_NAME) : 0;
    const OBJECT_ID = this.OBJECT_ID !== null ? builder.createString(this.OBJECT_ID) : 0;
    const OWNER = this.OWNER !== null ? builder.createString(this.OWNER) : 0;
    const LAUNCH_DATE = this.LAUNCH_DATE !== null ? builder.createString(this.LAUNCH_DATE) : 0;
    const LAUNCH_SITE = this.LAUNCH_SITE !== null ? builder.createString(this.LAUNCH_SITE) : 0;
    const DECAY_DATE = this.DECAY_DATE !== null ? builder.createString(this.DECAY_DATE) : 0;
    const ORBIT_CENTER = this.ORBIT_CENTER !== null ? builder.createString(this.ORBIT_CENTER) : 0;
    const DEPLOYMENT_DATE = this.DEPLOYMENT_DATE !== null ? builder.createString(this.DEPLOYMENT_DATE) : 0;
    return SATCAT.createSATCAT(
      builder,
      OBJECT_NAME,
      OBJECT_ID,
      this.NORAD_CAT_ID,
      this.OBJECT_TYPE,
      this.OPS_STATUS_CODE,
      OWNER,
      LAUNCH_DATE,
      LAUNCH_SITE,
      DECAY_DATE,
      this.PERIOD,
      this.INCLINATION,
      this.APOGEE,
      this.PERIGEE,
      this.RCS,
      this.DATA_STATUS_CODE,
      ORBIT_CENTER,
      this.ORBIT_TYPE,
      DEPLOYMENT_DATE,
      this.MANEUVERABLE,
      this.SIZE,
      this.MASS,
      this.MASS_TYPE
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SATCAT,
  SATCATT
});

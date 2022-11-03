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
var CATCOLLECTION_exports = {};
__export(CATCOLLECTION_exports, {
  CATCOLLECTION: () => CATCOLLECTION,
  CATCOLLECTIONT: () => CATCOLLECTIONT
});
module.exports = __toCommonJS(CATCOLLECTION_exports);
var flatbuffers = __toESM(require("flatbuffers"));
var import_CAT = require("./CAT");
class CATCOLLECTION {
  bb = null;
  bb_pos = 0;
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsCATCOLLECTION(bb, obj) {
    return (obj || new CATCOLLECTION()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsCATCOLLECTION(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new CATCOLLECTION()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  RECORDS(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? (obj || new import_CAT.CAT()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  RECORDSLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startCATCOLLECTION(builder) {
    builder.startObject(1);
  }
  static addRECORDS(builder, RECORDSOffset) {
    builder.addFieldOffset(0, RECORDSOffset, 0);
  }
  static createRECORDSVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startRECORDSVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endCATCOLLECTION(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createCATCOLLECTION(builder, RECORDSOffset) {
    CATCOLLECTION.startCATCOLLECTION(builder);
    CATCOLLECTION.addRECORDS(builder, RECORDSOffset);
    return CATCOLLECTION.endCATCOLLECTION(builder);
  }
  unpack() {
    return new CATCOLLECTIONT(
      this.bb.createObjList(this.RECORDS.bind(this), this.RECORDSLength())
    );
  }
  unpackTo(_o) {
    _o.RECORDS = this.bb.createObjList(this.RECORDS.bind(this), this.RECORDSLength());
  }
}
class CATCOLLECTIONT {
  constructor(RECORDS = []) {
    this.RECORDS = RECORDS;
  }
  pack(builder) {
    const RECORDS = CATCOLLECTION.createRECORDSVector(builder, builder.createObjectOffsetList(this.RECORDS));
    return CATCOLLECTION.createCATCOLLECTION(
      builder,
      RECORDS
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CATCOLLECTION,
  CATCOLLECTIONT
});

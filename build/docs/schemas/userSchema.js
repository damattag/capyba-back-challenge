"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/docs/schemas/userSchema.ts
var userSchema_exports = {};
__export(userSchema_exports, {
  default: () => userSchema_default
});
module.exports = __toCommonJS(userSchema_exports);
var userSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid"
    },
    name: {
      type: "string"
    },
    email: {
      type: "string"
    },
    password: {
      type: "string"
    },
    image: {
      type: "string"
    },
    acceptedTerms: {
      type: "boolean"
    },
    emailVerified: {
      type: "boolean"
    },
    emailVerifyToken: {
      type: "string"
    },
    emailVerifyExpiry: {
      type: "string",
      format: "date-time"
    },
    role: {
      type: "string",
      enum: ["ADMIN", "USER"]
    }
  },
  required: ["name", "email", "password", "acceptedTerms"]
};
var userSchema_default = userSchema;

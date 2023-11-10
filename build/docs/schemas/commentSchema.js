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

// src/docs/schemas/commentSchema.ts
var commentSchema_exports = {};
__export(commentSchema_exports, {
  default: () => commentSchema_default
});
module.exports = __toCommonJS(commentSchema_exports);
var commentSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid"
    },
    createdAt: {
      type: "string",
      format: "date-time"
    },
    edited: {
      type: "boolean"
    },
    content: {
      type: "string"
    },
    authorId: {
      type: "string"
    },
    postId: {
      type: "string"
    },
    commentParentId: {
      type: "string"
    }
  },
  required: ["content", "authorId", "postId"]
};
var commentSchema_default = commentSchema;

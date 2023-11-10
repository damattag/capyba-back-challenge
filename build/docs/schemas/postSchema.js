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

// src/docs/schemas/postSchema.ts
var postSchema_exports = {};
__export(postSchema_exports, {
  default: () => postSchema_default
});
module.exports = __toCommonJS(postSchema_exports);
var postSchema = {
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
    updatedAt: {
      type: "string",
      format: "date-time"
    },
    title: {
      type: "string"
    },
    content: {
      type: "string"
    },
    published: {
      type: "boolean"
    },
    authorId: {
      type: "string"
    }
  },
  required: ["title", "content", "authorId"]
};
var postSchema_default = postSchema;

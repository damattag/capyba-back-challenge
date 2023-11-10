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

// src/docs/schemas/index.ts
var schemas_exports = {};
__export(schemas_exports, {
  commentSchema: () => commentSchema_default,
  postSchema: () => postSchema_default,
  userSchema: () => userSchema_default
});
module.exports = __toCommonJS(schemas_exports);

// src/docs/schemas/userSchema.ts
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

// src/docs/schemas/commentSchema.ts
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

// src/docs/schemas/postSchema.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  commentSchema,
  postSchema,
  userSchema
});

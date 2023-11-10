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

// src/DTOs/Post.ts
var Post_exports = {};
__export(Post_exports, {
  PostGetSchema: () => PostGetSchema,
  PostSchema: () => PostSchema,
  PostUpdateSchema: () => PostUpdateSchema
});
module.exports = __toCommonJS(Post_exports);
var import_zod = require("zod");
var PostSchema = import_zod.z.object({
  title: import_zod.z.string({ required_error: "O t\xEDtulo \xE9 obrigat\xF3rio." }),
  content: import_zod.z.string({ required_error: "O conte\xFAdo \xE9 obrigat\xF3rio." }),
  authorId: import_zod.z.string({ required_error: "O id do autor \xE9 obrigat\xF3rio." }),
  published: import_zod.z.boolean({
    required_error: "O status de publica\xE7\xE3o \xE9 obrigat\xF3rio.",
    invalid_type_error: "O status de publica\xE7\xE3o deve ser um booleano."
  }).default(false)
});
var PostUpdateSchema = PostSchema.partial().omit({
  authorId: true,
  published: true
});
var PostGetSchema = import_zod.z.object({
  search: import_zod.z.string({ invalid_type_error: "O t\xEDtulo deve deve ser um texto." }).optional(),
  page: import_zod.z.coerce.number({ invalid_type_error: "A p\xE1gina deve deve ser um n\xFAmero." }).int({ message: "A p\xE1gina deve ser um n\xFAmero inteiro." }).min(1, { message: "A p\xE1gina deve ser maior que 0." }).default(1),
  limit: import_zod.z.coerce.number({ invalid_type_error: "O limite deve deve ser um n\xFAmero." }).int({ message: "O limite deve ser um n\xFAmero inteiro." }).min(1, { message: "O limite deve ser maior que 0." }).default(50),
  isDraft: import_zod.z.coerce.boolean({
    invalid_type_error: "O status de publica\xE7\xE3o deve ser um booleano."
  }).optional(),
  orderField: import_zod.z.enum(
    [
      "id",
      "createdAt",
      "updatedAt",
      "title",
      "content",
      "published",
      "authorId"
    ],
    {
      invalid_type_error: "O campo de ordena\xE7\xE3o deve ser 'id', 'createdAt', 'updatedAt', 'title', 'content', 'published' ou 'authorId'."
    }
  ).optional(),
  order: import_zod.z.enum(["asc", "desc"], {
    invalid_type_error: "A ordena\xE7\xE3o deve ser 'asc' ou 'desc'."
  }).optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostGetSchema,
  PostSchema,
  PostUpdateSchema
});

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

// src/DTOs/Comment.ts
var Comment_exports = {};
__export(Comment_exports, {
  CommentGetSchema: () => CommentGetSchema,
  CommentSchema: () => CommentSchema,
  CommentUpdateSchema: () => CommentUpdateSchema
});
module.exports = __toCommonJS(Comment_exports);
var import_zod = require("zod");
var CommentSchema = import_zod.z.object({
  content: import_zod.z.string({ required_error: "O conte\xFAdo \xE9 obrigat\xF3rio." }),
  authorId: import_zod.z.string({ required_error: "O id do autor \xE9 obrigat\xF3rio." }),
  postId: import_zod.z.string({ required_error: "O id do post \xE9 obrigat\xF3rio." }),
  commentParentId: import_zod.z.string({
    required_error: "O id do coment\xE1rio pai \xE9 obrigat\xF3rio."
  }).optional()
});
var CommentUpdateSchema = CommentSchema.partial().omit({
  authorId: true,
  postId: true,
  commentParentId: true
});
var CommentGetSchema = import_zod.z.object({
  search: import_zod.z.string({ invalid_type_error: "O t\xEDtulo deve deve ser um texto." }).optional(),
  page: import_zod.z.coerce.number({ invalid_type_error: "A p\xE1gina deve deve ser um n\xFAmero." }).int({ message: "A p\xE1gina deve ser um n\xFAmero inteiro." }).min(1, { message: "A p\xE1gina deve ser maior que 0." }).default(1),
  limit: import_zod.z.coerce.number({ invalid_type_error: "O limite deve deve ser um n\xFAmero." }).int({ message: "O limite deve ser um n\xFAmero inteiro." }).min(1, { message: "O limite deve ser maior que 0." }).default(50),
  isEdited: import_zod.z.coerce.boolean({
    invalid_type_error: "O status de edi\xE7\xE3o deve ser um booleano."
  }).optional(),
  orderField: import_zod.z.enum(
    [
      "content",
      "authorId",
      "postId",
      "commentParentId",
      "edited",
      "id",
      "createdAt"
    ],
    {
      invalid_type_error: "O campo de ordena\xE7\xE3o deve ser 'content', 'authorId', 'postId', 'commentParentId', 'edited', 'id', 'createdAt'."
    }
  ).optional(),
  order: import_zod.z.enum(["asc", "desc"], {
    invalid_type_error: "A ordena\xE7\xE3o deve ser 'asc' ou 'desc'."
  }).optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommentGetSchema,
  CommentSchema,
  CommentUpdateSchema
});

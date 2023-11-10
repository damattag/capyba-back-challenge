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

// src/DTOs/index.ts
var DTOs_exports = {};
__export(DTOs_exports, {
  CommentGetSchema: () => CommentGetSchema,
  CommentSchema: () => CommentSchema,
  CommentUpdateSchema: () => CommentUpdateSchema,
  PostGetSchema: () => PostGetSchema,
  PostSchema: () => PostSchema,
  PostUpdateSchema: () => PostUpdateSchema,
  UserEmailVerificationSchema: () => UserEmailVerificationSchema,
  UserSchema: () => UserSchema,
  UserUpdateSchema: () => UserUpdateSchema
});
module.exports = __toCommonJS(DTOs_exports);

// src/DTOs/User.ts
var import_zod = require("zod");
var UserSchema = import_zod.z.object({
  name: import_zod.z.string({ required_error: "O nome \xE9 obrigat\xF3rio." }),
  email: import_zod.z.string({ required_error: "O e-mail \xE9 obrigat\xF3rio." }).email({ message: "O e-mail \xE9 inv\xE1lido." }),
  password: import_zod.z.string({ required_error: "A senha \xE9 obrigat\xF3ria." }).min(8, { message: "A senha deve ter no m\xEDnimo 8 caracteres." }).regex(/[a-z]/i, { message: "A senha deve ter pelo menos uma letra." }).regex(/[0-9]/, { message: "A senha deve ter pelo menos um n\xFAmero." }),
  image: import_zod.z.string({ required_error: "A imagem \xE9 obrigat\xF3ria." }),
  acceptedTerms: import_zod.z.boolean({ required_error: "Os termos s\xE3o obrigat\xF3rios." }),
  role: import_zod.z.enum(["USER", "ADMIN"], {
    invalid_type_error: "O cargo deve ser USER ou ADMIN."
  }).default("USER")
});
var UserUpdateSchema = UserSchema.partial().omit({
  acceptedTerms: true,
  role: true
}).extend({
  password: import_zod.z.string().optional(),
  newPassword: import_zod.z.string().min(8, {
    message: "A senha deve ter no m\xEDnimo 8 caracteres."
  }).regex(/[a-z]/i, { message: "A senha deve ter pelo menos uma letra." }).regex(/[0-9]/, { message: "A senha deve ter pelo menos um n\xFAmero." }).optional()
}).refine(
  (data) => {
    if (!data.newPassword || !data.password) {
      return false;
    }
    return true;
  },
  { message: "Insira a senha para que a mesma possa ser alterada." }
);
var UserEmailVerificationSchema = import_zod.z.object({
  email: import_zod.z.string({ required_error: "O e-mail \xE9 obrigat\xF3rio." }).email({ message: "O e-mail \xE9 inv\xE1lido." }),
  token: import_zod.z.string({ required_error: "O token \xE9 obrigat\xF3rio." }).min(6, { message: "O token deve ter 6 caracteres." }).max(6, { message: "O token deve ter 6 caracteres." })
});

// src/DTOs/Post.ts
var import_zod2 = require("zod");
var PostSchema = import_zod2.z.object({
  title: import_zod2.z.string({ required_error: "O t\xEDtulo \xE9 obrigat\xF3rio." }),
  content: import_zod2.z.string({ required_error: "O conte\xFAdo \xE9 obrigat\xF3rio." }),
  authorId: import_zod2.z.string({ required_error: "O id do autor \xE9 obrigat\xF3rio." }),
  published: import_zod2.z.boolean({
    required_error: "O status de publica\xE7\xE3o \xE9 obrigat\xF3rio.",
    invalid_type_error: "O status de publica\xE7\xE3o deve ser um booleano."
  }).default(false)
});
var PostUpdateSchema = PostSchema.partial().omit({
  authorId: true,
  published: true
});
var PostGetSchema = import_zod2.z.object({
  search: import_zod2.z.string({ invalid_type_error: "O t\xEDtulo deve deve ser um texto." }).optional(),
  page: import_zod2.z.coerce.number({ invalid_type_error: "A p\xE1gina deve deve ser um n\xFAmero." }).int({ message: "A p\xE1gina deve ser um n\xFAmero inteiro." }).min(1, { message: "A p\xE1gina deve ser maior que 0." }).default(1),
  limit: import_zod2.z.coerce.number({ invalid_type_error: "O limite deve deve ser um n\xFAmero." }).int({ message: "O limite deve ser um n\xFAmero inteiro." }).min(1, { message: "O limite deve ser maior que 0." }).default(50),
  isDraft: import_zod2.z.coerce.boolean({
    invalid_type_error: "O status de publica\xE7\xE3o deve ser um booleano."
  }).optional(),
  orderField: import_zod2.z.enum(
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
  order: import_zod2.z.enum(["asc", "desc"], {
    invalid_type_error: "A ordena\xE7\xE3o deve ser 'asc' ou 'desc'."
  }).optional()
});

// src/DTOs/Comment.ts
var import_zod3 = require("zod");
var CommentSchema = import_zod3.z.object({
  content: import_zod3.z.string({ required_error: "O conte\xFAdo \xE9 obrigat\xF3rio." }),
  authorId: import_zod3.z.string({ required_error: "O id do autor \xE9 obrigat\xF3rio." }),
  postId: import_zod3.z.string({ required_error: "O id do post \xE9 obrigat\xF3rio." }),
  commentParentId: import_zod3.z.string({
    required_error: "O id do coment\xE1rio pai \xE9 obrigat\xF3rio."
  }).optional()
});
var CommentUpdateSchema = CommentSchema.partial().omit({
  authorId: true,
  postId: true,
  commentParentId: true
});
var CommentGetSchema = import_zod3.z.object({
  search: import_zod3.z.string({ invalid_type_error: "O t\xEDtulo deve deve ser um texto." }).optional(),
  page: import_zod3.z.coerce.number({ invalid_type_error: "A p\xE1gina deve deve ser um n\xFAmero." }).int({ message: "A p\xE1gina deve ser um n\xFAmero inteiro." }).min(1, { message: "A p\xE1gina deve ser maior que 0." }).default(1),
  limit: import_zod3.z.coerce.number({ invalid_type_error: "O limite deve deve ser um n\xFAmero." }).int({ message: "O limite deve ser um n\xFAmero inteiro." }).min(1, { message: "O limite deve ser maior que 0." }).default(50),
  isEdited: import_zod3.z.coerce.boolean({
    invalid_type_error: "O status de edi\xE7\xE3o deve ser um booleano."
  }).optional(),
  orderField: import_zod3.z.enum(
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
  order: import_zod3.z.enum(["asc", "desc"], {
    invalid_type_error: "A ordena\xE7\xE3o deve ser 'asc' ou 'desc'."
  }).optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommentGetSchema,
  CommentSchema,
  CommentUpdateSchema,
  PostGetSchema,
  PostSchema,
  PostUpdateSchema,
  UserEmailVerificationSchema,
  UserSchema,
  UserUpdateSchema
});

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

// src/DTOs/User.ts
var User_exports = {};
__export(User_exports, {
  UserEmailVerificationSchema: () => UserEmailVerificationSchema,
  UserSchema: () => UserSchema,
  UserUpdateSchema: () => UserUpdateSchema
});
module.exports = __toCommonJS(User_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserEmailVerificationSchema,
  UserSchema,
  UserUpdateSchema
});

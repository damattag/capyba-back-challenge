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

// src/env/index.ts
var env_exports = {};
__export(env_exports, {
  default: () => env_default
});
module.exports = __toCommonJS(env_exports);
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  SERVER_PORT: import_zod.z.coerce.number(),
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]),
  JWT_SECRET: import_zod.z.string(),
  EMAIL: import_zod.z.string(),
  EMAIL_PASSWORD: import_zod.z.string(),
  DATABASE_URL: import_zod.z.string()
});
var devEnvSchema = envSchema.extend({
  DATABASE_TYPE: import_zod.z.string(),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number(),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_DB: import_zod.z.string(),
  DATABASE_TEST_HOST: import_zod.z.string(),
  DATABASE_TEST_PORT: import_zod.z.coerce.number(),
  DATABASE_TEST_USER: import_zod.z.string(),
  DATABASE_TEST_PASSWORD: import_zod.z.string(),
  DATABASE_TEST_DB: import_zod.z.string()
});
var envValidation = process.env.NODE_ENV !== "production" ? devEnvSchema.safeParse(process.env) : envSchema.safeParse(process.env);
if (!envValidation.success) {
  console.error("Invalid environment variables", envValidation.error.format());
  throw new Error("Invalid environment variables");
}
var env_default = envValidation.data;

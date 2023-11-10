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

// src/repositories/userRepository.ts
var userRepository_exports = {};
__export(userRepository_exports, {
  default: () => userRepository_default
});
module.exports = __toCommonJS(userRepository_exports);

// src/database/client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "error"] : []
});
var client_default = prisma;

// src/repositories/userRepository.ts
var UserRepository = class {
  async create(data) {
    const user = await client_default.user.create({
      data
    });
    return user;
  }
  async findByEmail(email) {
    const user = await client_default.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async findById(id) {
    const user = await client_default.user.findUnique({
      where: {
        id
      }
    });
    return user;
  }
  async findAll() {
    const users = await client_default.user.findMany();
    return users;
  }
  async update(id, data) {
    const user = await client_default.user.update({
      where: {
        id
      },
      data
    });
    return user;
  }
  async delete(id) {
    const user = await client_default.user.delete({
      where: {
        id
      }
    });
    return user;
  }
};
var userRepository_default = new UserRepository();

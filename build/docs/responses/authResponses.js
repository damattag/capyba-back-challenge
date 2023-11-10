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

// src/docs/responses/authResponses.ts
var authResponses_exports = {};
__export(authResponses_exports, {
  default: () => authResponses_default
});
module.exports = __toCommonJS(authResponses_exports);
var authResponses = {
  login: {
    200: {
      description: "Login realizado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/user"
          }
        }
      }
    },
    400: {
      $ref: "Login e/ou senha incorretos."
    },
    500: {
      $ref: "Erro no servidor, tente novamente mais tarde."
    }
  },
  logout: {
    204: {
      description: "Logout realizado com sucesso."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  }
};
var authResponses_default = authResponses;

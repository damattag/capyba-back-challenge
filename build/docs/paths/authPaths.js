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

// src/docs/paths/authPaths.ts
var authPaths_exports = {};
__export(authPaths_exports, {
  default: () => authPaths_default
});
module.exports = __toCommonJS(authPaths_exports);

// src/docs/responses/authResponses.ts
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

// src/docs/paths/authPaths.ts
var authPaths = {
  "/session": {
    post: {
      tags: ["Auth"],
      summary: "Login",
      description: "Login",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "johndoe@email.com"
                },
                password: {
                  type: "string",
                  example: "abcd1234"
                }
              }
            }
          }
        }
      },
      responses: {
        ...authResponses_default.login
      }
    },
    delete: {
      tags: ["Auth"],
      summary: "Logout",
      description: "Logout",
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        ...authResponses_default.logout
      }
    }
  }
};
var authPaths_default = authPaths;

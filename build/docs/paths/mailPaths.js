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

// src/docs/paths/mailPaths.ts
var mailPaths_exports = {};
__export(mailPaths_exports, {
  default: () => mailPaths_default
});
module.exports = __toCommonJS(mailPaths_exports);

// src/docs/responses/mailResponses.ts
var mailResponse = {
  emailVerification: {
    200: {
      description: "E-mail enviado com sucesso."
    },
    401: {
      description: "Erro de autentica\xE7\xE3o."
    },
    404: {
      description: "Usu\xE1rio n\xE3o encontrado."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    },
    503: {
      description: "Erro ao enviar e-mail."
    }
  }
};
var mailResponses_default = mailResponse;

// src/docs/paths/mailPaths.ts
var mailPaths = {
  "/mail": {
    post: {
      tags: ["Mail"],
      summary: "Send mail",
      description: "Send mail",
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
                }
              }
            }
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        ...mailResponses_default.emailVerification
      }
    }
  }
};
var mailPaths_default = mailPaths;

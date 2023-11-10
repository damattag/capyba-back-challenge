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

// src/docs/responses/postResponses.ts
var postResponses_exports = {};
__export(postResponses_exports, {
  default: () => postResponses_default
});
module.exports = __toCommonJS(postResponses_exports);
var postResponse = {
  create: {
    201: {
      description: "Post criado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post"
          }
        }
      }
    },
    400: {
      description: "Erros de valida\xE7\xE3o."
    },
    401: {
      description: "Erro de autentica\xE7\xE3o."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  },
  readByUser: {
    200: {
      description: "Posts encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post"
          }
        }
      }
    },
    400: {
      description: "Erros de valida\xE7\xE3o."
    },
    401: {
      description: "Erro de autentica\xE7\xE3o."
    },
    404: {
      description: "Usu\xE1rio n\xE3o encontrado."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  },
  read: {
    200: {
      description: "Post encontrado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post"
          }
        }
      }
    },
    401: {
      description: "Erro de autentica\xE7\xE3o."
    },
    404: {
      description: "Post n\xE3o encontrado."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  },
  readAll: {
    200: {
      description: "Posts encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post"
          }
        }
      }
    },
    401: {
      description: "Erro de autentica\xE7\xE3o."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  },
  update: {
    200: {
      description: "Post atualizado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post"
          }
        }
      }
    },
    400: {
      description: "Erros de valida\xE7\xE3o."
    },
    401: {
      description: "Erro de autentica\xE7\xE3o."
    },
    404: {
      description: "Post n\xE3o encontrado."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  },
  delete: {
    200: {
      description: "Post deletado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post"
          }
        }
      }
    },
    401: {
      description: "Erro de autentica\xE7\xE3o."
    },
    404: {
      description: "Post n\xE3o encontrado."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  }
};
var postResponses_default = postResponse;

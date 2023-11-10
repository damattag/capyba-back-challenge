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

// src/docs/responses/commentResponses.ts
var commentResponses_exports = {};
__export(commentResponses_exports, {
  default: () => commentResponses_default
});
module.exports = __toCommonJS(commentResponses_exports);
var commentResponse = {
  create: {
    201: {
      description: "Coment\xE1rio criado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment"
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
    403: {
      description: "E-mail n\xE3o verificado, por favor verifique seu e-mail."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  },
  readByPost: {
    200: {
      description: "Coment\xE1rios encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment"
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
    403: {
      description: "E-mail n\xE3o verificado, por favor verifique seu e-mail."
    },
    404: {
      description: "Post n\xE3o encontrado."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  },
  readByUser: {
    200: {
      description: "Coment\xE1rios encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment"
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
    403: {
      description: "E-mail n\xE3o verificado, por favor verifique seu e-mail."
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
      description: "Coment\xE1rio encontrado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment"
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
    403: {
      description: "E-mail n\xE3o verificado, por favor verifique seu e-mail."
    },
    404: {
      description: "Coment\xE1rio n\xE3o encontrado."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  },
  readAll: {
    200: {
      description: "Coment\xE1rios encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment"
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
    403: {
      description: "E-mail n\xE3o verificado, por favor verifique seu e-mail."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  },
  update: {
    200: {
      description: "Coment\xE1rio atualizado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment"
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
    403: {
      description: "E-mail n\xE3o verificado, por favor verifique seu e-mail."
    },
    404: {
      description: "Coment\xE1rio n\xE3o encontrado."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  },
  delete: {
    200: {
      description: "Coment\xE1rio deletado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment"
          }
        }
      }
    },
    401: {
      description: "Erro de autentica\xE7\xE3o."
    },
    403: {
      description: "E-mail n\xE3o verificado, por favor verifique seu e-mail."
    },
    404: {
      description: "Coment\xE1rio n\xE3o encontrado."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  }
};
var commentResponses_default = commentResponse;

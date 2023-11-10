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

// src/docs/responses/index.ts
var responses_exports = {};
__export(responses_exports, {
  authResponse: () => authResponses_default,
  commentResponse: () => commentResponses_default,
  mailResponse: () => mailResponses_default,
  postResponse: () => postResponses_default,
  userResponse: () => userResponses_default
});
module.exports = __toCommonJS(responses_exports);

// src/docs/responses/commentResponses.ts
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

// src/docs/responses/userResponses.ts
var userResponse = {
  create: {
    201: {
      description: "Usu\xE1rio criado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user"
          }
        }
      }
    },
    400: {
      description: "Erros de valida\xE7\xE3o."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  },
  read: {
    200: {
      description: "Usu\xE1rio encontrado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user"
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
  readAll: {
    200: {
      description: "Usu\xE1rios encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user"
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
      description: "Usu\xE1rio atualizado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user"
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
  delete: {
    200: {
      description: "Usu\xE1rio deletado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user"
          }
        }
      }
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
  verifyEmail: {
    200: {
      description: "Email verificado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user"
          }
        }
      }
    },
    400: {
      description: "Erros de valida\xE7\xE3o."
    },
    401: {
      description: "Erros de autentica\xE7\xE3o."
    },
    404: {
      description: "Usu\xE1rio n\xE3o encontrado."
    },
    500: {
      description: "Erro no servidor, tente novamente mais tarde."
    }
  }
};
var userResponses_default = userResponse;

// src/docs/responses/postResponses.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authResponse,
  commentResponse,
  mailResponse,
  postResponse,
  userResponse
});

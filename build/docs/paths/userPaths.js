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

// src/docs/paths/userPaths.ts
var userPaths_exports = {};
__export(userPaths_exports, {
  default: () => userPaths_default
});
module.exports = __toCommonJS(userPaths_exports);

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

// src/docs/paths/userPaths.ts
var userPaths = {
  "/user": {
    post: {
      tags: ["User"],
      summary: "Create a new user.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/user"
            },
            example: {
              name: "John Doe",
              email: "johndoe@email.com",
              password: "abcd1234",
              acceptedTerms: true,
              image: "https://i.imgur.com/1qZ0QZB.jpeg"
            }
          }
        }
      },
      responses: {
        ...userResponses_default.create
      }
    },
    get: {
      tags: ["User"],
      summary: "Get all users.",
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        ...userResponses_default.readAll
      }
    }
  },
  "/user/{id}": {
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "User ID.",
        schema: {
          type: "string"
        }
      }
    ],
    patch: {
      tags: ["User"],
      summary: "Update a user.",
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/user"
            },
            example: {
              name: "Jonathan Doe"
            }
          }
        }
      },
      responses: {
        ...userResponses_default.update
      }
    },
    get: {
      tags: ["User"],
      summary: "Get a user.",
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        ...userResponses_default.read
      }
    },
    delete: {
      tags: ["User"],
      summary: "Delete a user.",
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        ...userResponses_default.delete
      }
    }
  },
  "/user/verify-email": {
    patch: {
      tags: ["User"],
      summary: "Verify user email.",
      security: [
        {
          bearerAuth: []
        }
      ],
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
                token: {
                  type: "string",
                  example: "a1b2c3"
                }
              }
            }
          }
        }
      },
      responses: {
        ...userResponses_default.verifyEmail
      }
    }
  }
};
var userPaths_default = userPaths;

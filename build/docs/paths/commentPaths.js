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

// src/docs/paths/commentPaths.ts
var commentPaths_exports = {};
__export(commentPaths_exports, {
  default: () => commentPaths_default
});
module.exports = __toCommonJS(commentPaths_exports);

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

// src/docs/paths/commentPaths.ts
var commentPaths = {
  "/comment": {
    post: {
      tags: ["Comment"],
      summary: "Create a comment.",
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
              $ref: "#/components/schemas/comment"
            },
            example: {
              content: "This is a comment.",
              postId: "60f2c8e9c3e5d60015c4a3c5",
              authorId: "60f2c8e9c3e5d60015c4a3c4"
            }
          }
        }
      },
      responses: {
        ...commentResponses_default.create
      }
    },
    get: {
      tags: ["Comment"],
      summary: "Read all comments.",
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "number"
          },
          required: false
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "number"
          },
          required: false
        },
        {
          in: "query",
          name: "isEdited",
          schema: {
            type: "boolean"
          },
          required: false
        },
        {
          in: "query",
          name: "orderField",
          schema: {
            type: "string",
            enum: [
              "content",
              "authorId",
              "postId",
              "id",
              "commentParentId",
              "edited",
              "createdAt"
            ]
          },
          required: false
        },
        {
          in: "query",
          name: "order",
          schema: {
            type: "string",
            enum: ["asc", "desc"]
          },
          required: false
        },
        {
          in: "query",
          name: "search",
          schema: {
            type: "string"
          },
          required: false
        }
      ],
      responses: {
        ...commentResponses_default.readAll
      }
    }
  },
  "/comment/{id}": {
    parameters: [
      {
        in: "path",
        name: "id",
        schema: {
          type: "string"
        },
        required: true
      }
    ],
    get: {
      tags: ["Comment"],
      summary: "Read a comment.",
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        ...commentResponses_default.read
      }
    },
    patch: {
      tags: ["Comment"],
      summary: "Update a comment.",
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
              $ref: "#/components/schemas/comment"
            },
            example: {
              content: "This is a comment modified."
            }
          }
        }
      },
      responses: {
        ...commentResponses_default.update
      }
    },
    delete: {
      tags: ["Comment"],
      summary: "Delete a comment.",
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        ...commentResponses_default.delete
      }
    }
  },
  "/comment/user/{id}": {
    parameters: [
      {
        in: "path",
        name: "id",
        schema: {
          type: "string"
        },
        required: true
      }
    ],
    get: {
      tags: ["Comment"],
      summary: "Read all comments by user.",
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "number"
          },
          required: false
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "number"
          },
          required: false
        },
        {
          in: "query",
          name: "isEdited",
          schema: {
            type: "boolean"
          },
          required: false
        },
        {
          in: "query",
          name: "orderField",
          schema: {
            type: "string",
            enum: [
              "content",
              "authorId",
              "postId",
              "id",
              "commentParentId",
              "edited",
              "createdAt"
            ]
          },
          required: false
        },
        {
          in: "query",
          name: "order",
          schema: {
            type: "string",
            enum: ["asc", "desc"]
          },
          required: false
        }
      ],
      responses: {
        ...commentResponses_default.readByUser
      }
    }
  },
  "/comment/post/{id}": {
    parameters: [
      {
        in: "path",
        name: "id",
        schema: {
          type: "string"
        },
        required: true
      }
    ],
    get: {
      tags: ["Comment"],
      summary: "Read all comments by post.",
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "number"
          },
          required: false
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "number"
          },
          required: false
        },
        {
          in: "query",
          name: "isEdited",
          schema: {
            type: "boolean"
          },
          required: false
        },
        {
          in: "query",
          name: "orderField",
          schema: {
            type: "string",
            enum: [
              "content",
              "authorId",
              "postId",
              "id",
              "commentParentId",
              "edited",
              "createdAt"
            ]
          },
          required: false
        },
        {
          in: "query",
          name: "order",
          schema: {
            type: "string",
            enum: ["asc", "desc"]
          },
          required: false
        }
      ],
      responses: {
        ...commentResponses_default.readByPost
      }
    }
  }
};
var commentPaths_default = commentPaths;

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

// src/docs/paths/postPaths.ts
var postPaths_exports = {};
__export(postPaths_exports, {
  default: () => postPaths_default
});
module.exports = __toCommonJS(postPaths_exports);

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

// src/docs/paths/postPaths.ts
var postPaths = {
  "/post": {
    post: {
      tags: ["Post"],
      summary: "Create a new post.",
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
              $ref: "#/components/schemas/post"
            },
            example: {
              title: "Post title",
              content: "Post content",
              image: "https://i.imgur.com/1qZ0QZB.jpeg"
            }
          }
        }
      },
      responses: {
        ...postResponses_default.create
      }
    },
    get: {
      tags: ["Post"],
      summary: "Get all posts.",
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          name: "page",
          in: "query",
          required: false,
          description: "Page number.",
          schema: {
            type: "number"
          }
        },
        {
          name: "limit",
          in: "query",
          required: false,
          description: "Limit of posts per page.",
          schema: {
            type: "number"
          }
        },
        {
          name: "isDraft",
          in: "query",
          required: false,
          description: "Filter posts by draft.",
          schema: {
            type: "boolean"
          }
        },
        {
          name: "order",
          in: "query",
          required: false,
          description: "Order of posts.",
          schema: {
            type: "string",
            enum: ["asc", "desc"]
          }
        },
        {
          name: "orderField",
          in: "query",
          required: false,
          description: "Field to order posts.",
          schema: {
            type: "string",
            enum: [
              "id",
              "title",
              "content",
              "authorId",
              "published",
              "createdAt",
              "updatedAt"
            ]
          }
        },
        {
          name: "search",
          in: "query",
          required: false,
          description: "Search posts by text.",
          schema: {
            type: "string"
          }
        }
      ],
      responses: {
        ...postResponses_default.readAll
      }
    }
  },
  "/post/{id}": {
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "Post ID.",
        schema: {
          type: "string"
        }
      }
    ],
    patch: {
      tags: ["Post"],
      summary: "Update a post.",
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
              $ref: "#/components/schemas/post"
            },
            example: {
              title: "Post title modified"
            }
          }
        }
      },
      responses: {
        ...postResponses_default.update
      }
    },
    delete: {
      tags: ["Post"],
      summary: "Delete a post.",
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        ...postResponses_default.delete
      }
    },
    get: {
      tags: ["Post"],
      summary: "Get a post.",
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        ...postResponses_default.read
      }
    }
  },
  "/post/user/{id}": {
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
    get: {
      tags: ["Post"],
      summary: "Get all posts from a user.",
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          name: "page",
          in: "query",
          required: false,
          description: "Page number.",
          schema: {
            type: "number"
          }
        },
        {
          name: "limit",
          in: "query",
          required: false,
          description: "Limit of posts per page.",
          schema: {
            type: "number"
          }
        },
        {
          name: "isDraft",
          in: "query",
          required: false,
          description: "Filter posts by draft.",
          schema: {
            type: "boolean"
          }
        },
        {
          name: "order",
          in: "query",
          required: false,
          description: "Order of posts.",
          schema: {
            type: "string",
            enum: ["asc", "desc"]
          }
        },
        {
          name: "orderField",
          in: "query",
          required: false,
          description: "Field to order posts.",
          schema: {
            type: "string",
            enum: [
              "id",
              "title",
              "content",
              "authorId",
              "published",
              "createdAt",
              "updatedAt"
            ]
          }
        }
      ],
      responses: {
        ...postResponses_default.readByUser
      }
    }
  }
};
var postPaths_default = postPaths;

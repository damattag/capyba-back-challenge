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

// src/docs/index.ts
var docs_exports = {};
__export(docs_exports, {
  default: () => docs_default
});
module.exports = __toCommonJS(docs_exports);

// src/docs/schemas/userSchema.ts
var userSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid"
    },
    name: {
      type: "string"
    },
    email: {
      type: "string"
    },
    password: {
      type: "string"
    },
    image: {
      type: "string"
    },
    acceptedTerms: {
      type: "boolean"
    },
    emailVerified: {
      type: "boolean"
    },
    emailVerifyToken: {
      type: "string"
    },
    emailVerifyExpiry: {
      type: "string",
      format: "date-time"
    },
    role: {
      type: "string",
      enum: ["ADMIN", "USER"]
    }
  },
  required: ["name", "email", "password", "acceptedTerms"]
};
var userSchema_default = userSchema;

// src/docs/schemas/commentSchema.ts
var commentSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid"
    },
    createdAt: {
      type: "string",
      format: "date-time"
    },
    edited: {
      type: "boolean"
    },
    content: {
      type: "string"
    },
    authorId: {
      type: "string"
    },
    postId: {
      type: "string"
    },
    commentParentId: {
      type: "string"
    }
  },
  required: ["content", "authorId", "postId"]
};
var commentSchema_default = commentSchema;

// src/docs/schemas/postSchema.ts
var postSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid"
    },
    createdAt: {
      type: "string",
      format: "date-time"
    },
    updatedAt: {
      type: "string",
      format: "date-time"
    },
    title: {
      type: "string"
    },
    content: {
      type: "string"
    },
    published: {
      type: "boolean"
    },
    authorId: {
      type: "string"
    }
  },
  required: ["title", "content", "authorId"]
};
var postSchema_default = postSchema;

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

// src/docs/index.ts
var docs_default = {
  openapi: "3.0.0",
  info: {
    title: "Capyba Software Challenge API.",
    description: "API for back challenge of Capyba Software.",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Local Server"
    }
  ],
  paths: {
    ...commentPaths_default,
    ...postPaths_default,
    ...userPaths_default,
    ...authPaths_default,
    ...mailPaths_default
  },
  components: {
    schemas: {
      user: userSchema_default,
      post: postSchema_default,
      comment: commentSchema_default
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    security: {
      bearerAuth: []
    }
  }
};

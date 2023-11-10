const postResponse = {
  create: {
    201: {
      description: "Post criado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post",
          },
        },
      },
    },

    400: {
      description: "Erros de validação.",
    },

    401: {
      description: "Erro de autenticação.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  readByUser: {
    200: {
      description: "Posts encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post",
          },
        },
      },
    },

    400: {
      description: "Erros de validação.",
    },

    401: {
      description: "Erro de autenticação.",
    },

    404: {
      description: "Usuário não encontrado.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  read: {
    200: {
      description: "Post encontrado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post",
          },
        },
      },
    },

    401: {
      description: "Erro de autenticação.",
    },

    404: {
      description: "Post não encontrado.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  readAll: {
    200: {
      description: "Posts encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post",
          },
        },
      },
    },

    401: {
      description: "Erro de autenticação.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  update: {
    200: {
      description: "Post atualizado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post",
          },
        },
      },
    },

    400: {
      description: "Erros de validação.",
    },

    401: {
      description: "Erro de autenticação.",
    },

    404: {
      description: "Post não encontrado.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  delete: {
    200: {
      description: "Post deletado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post",
          },
        },
      },
    },

    401: {
      description: "Erro de autenticação.",
    },

    404: {
      description: "Post não encontrado.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },
};

export default postResponse;

const commentResponse = {
  create: {
    201: {
      description: "Comentário criado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment",
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

    403: {
      description: "E-mail não verificado, por favor verifique seu e-mail.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  readByPost: {
    200: {
      description: "Comentários encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment",
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

    403: {
      description: "E-mail não verificado, por favor verifique seu e-mail.",
    },

    404: {
      description: "Post não encontrado.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  readByUser: {
    200: {
      description: "Comentários encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment",
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

    403: {
      description: "E-mail não verificado, por favor verifique seu e-mail.",
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
      description: "Comentário encontrado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment",
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

    403: {
      description: "E-mail não verificado, por favor verifique seu e-mail.",
    },

    404: {
      description: "Comentário não encontrado.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  readAll: {
    200: {
      description: "Comentários encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment",
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

    403: {
      description: "E-mail não verificado, por favor verifique seu e-mail.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  update: {
    200: {
      description: "Comentário atualizado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment",
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

    403: {
      description: "E-mail não verificado, por favor verifique seu e-mail.",
    },

    404: {
      description: "Comentário não encontrado.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  delete: {
    200: {
      description: "Comentário deletado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/comment",
          },
        },
      },
    },

    401: {
      description: "Erro de autenticação.",
    },

    403: {
      description: "E-mail não verificado, por favor verifique seu e-mail.",
    },

    404: {
      description: "Comentário não encontrado.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },
};

export default commentResponse;

const userResponse = {
  create: {
    201: {
      description: "Usuário criado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user",
          },
        },
      },
    },

    400: {
      description: "Erros de validação.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  read: {
    200: {
      description: "Usuário encontrado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user",
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

  readAll: {
    200: {
      description: "Usuários encontrados com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user",
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
      description: "Usuário atualizado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user",
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

  delete: {
    200: {
      description: "Usuário deletado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user",
          },
        },
      },
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

  verifyEmail: {
    200: {
      description: "Email verificado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user",
          },
        },
      },
    },

    400: {
      description: "Erros de validação.",
    },

    401: {
      description: "Erros de autenticação.",
    },

    404: {
      description: "Usuário não encontrado.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },
};

export default userResponse;

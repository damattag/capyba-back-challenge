const authResponses = {
  login: {
    200: {
      description: "Login realizado com sucesso.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/user",
          },
        },
      },
    },

    400: {
      $ref: "Login e/ou senha incorretos.",
    },

    500: {
      $ref: "Erro no servidor, tente novamente mais tarde.",
    },
  },

  logout: {
    204: {
      description: "Logout realizado com sucesso.",
    },

    500: {
      description: "Erro no servidor, tente novamente mais tarde.",
    },
  },
};

export default authResponses;

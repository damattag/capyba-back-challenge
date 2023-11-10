const mailResponse = {
  emailVerification: {
    200: {
      description: "E-mail enviado com sucesso.",
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

    503: {
      description: "Erro ao enviar e-mail.",
    },
  },
};

export default mailResponse;

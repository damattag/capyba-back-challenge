import { authResponse } from "../responses";

const authPaths = {
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
                  example: "johndoe@email.com",
                },
                password: {
                  type: "string",
                  example: "abcd1234",
                },
              },
            },
          },
        },
      },
      responses: {
        ...authResponse.login,
      },
    },

    delete: {
      tags: ["Auth"],
      summary: "Logout",
      description: "Logout",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        ...authResponse.logout,
      },
    },
  },
};

export default authPaths;

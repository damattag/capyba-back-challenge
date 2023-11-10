import { mailResponse } from "../responses";

const mailPaths = {
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
                  example: "johndoe@email.com",
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        ...mailResponse.emailVerification,
      },
    },
  },
};

export default mailPaths;

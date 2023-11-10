import { userResponse } from "../responses";

const userPaths = {
  "/user": {
    post: {
      tags: ["User"],
      summary: "Create a new user.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/user",
            },
            example: {
              name: "John Doe",
              email: "johndoe@email.com",
              password: "abcd1234",
              acceptedTerms: true,
              image: "https://i.imgur.com/1qZ0QZB.jpeg",
            },
          },
        },
      },
      responses: {
        ...userResponse.create,
      },
    },

    get: {
      tags: ["User"],
      summary: "Get all users.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        ...userResponse.readAll,
      },
    },
  },

  "/user/{id}": {
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "User ID.",
        schema: {
          type: "string",
        },
      },
    ],

    patch: {
      tags: ["User"],
      summary: "Update a user.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/user",
            },
            example: {
              name: "Jonathan Doe",
            },
          },
        },
      },
      responses: {
        ...userResponse.update,
      },
    },

    get: {
      tags: ["User"],
      summary: "Get a user.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        ...userResponse.read,
      },
    },

    delete: {
      tags: ["User"],
      summary: "Delete a user.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        ...userResponse.delete,
      },
    },
  },

  "/user/verify-email": {
    patch: {
      tags: ["User"],
      summary: "Verify user email.",
      security: [
        {
          bearerAuth: [],
        },
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
                  example: "johndoe@email.com",
                },
                token: {
                  type: "string",
                  example: "a1b2c3",
                },
              },
            },
          },
        },
      },
      responses: {
        ...userResponse.verifyEmail,
      },
    },
  },
};

export default userPaths;

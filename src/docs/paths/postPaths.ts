import { postResponse } from "../responses";

const postPaths = {
  "/post": {
    post: {
      tags: ["Post"],
      summary: "Create a new post.",
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
              $ref: "#/components/schemas/post",
            },
            example: {
              title: "Post title",
              content: "Post content",
              image: "https://i.imgur.com/1qZ0QZB.jpeg",
            },
          },
        },
      },
      responses: {
        ...postResponse.create,
      },
    },

    get: {
      tags: ["Post"],
      summary: "Get all posts.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "page",
          in: "query",
          required: false,
          description: "Page number.",
          schema: {
            type: "number",
          },
        },
        {
          name: "limit",
          in: "query",
          required: false,
          description: "Limit of posts per page.",
          schema: {
            type: "number",
          },
        },
        {
          name: "isDraft",
          in: "query",
          required: false,
          description: "Filter posts by draft.",
          schema: {
            type: "boolean",
          },
        },
        {
          name: "order",
          in: "query",
          required: false,
          description: "Order of posts.",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
          },
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
              "updatedAt",
            ],
          },
        },
        {
          name: "search",
          in: "query",
          required: false,
          description: "Search posts by text.",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        ...postResponse.readAll,
      },
    },
  },

  "/post/{id}": {
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "Post ID.",
        schema: {
          type: "string",
        },
      },
    ],

    patch: {
      tags: ["Post"],
      summary: "Update a post.",
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
              $ref: "#/components/schemas/post",
            },
            example: {
              title: "Post title modified",
            },
          },
        },
      },
      responses: {
        ...postResponse.update,
      },
    },

    delete: {
      tags: ["Post"],
      summary: "Delete a post.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        ...postResponse.delete,
      },
    },

    get: {
      tags: ["Post"],
      summary: "Get a post.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        ...postResponse.read,
      },
    },
  },

  "/post/user/{id}": {
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

    get: {
      tags: ["Post"],
      summary: "Get all posts from a user.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "page",
          in: "query",
          required: false,
          description: "Page number.",
          schema: {
            type: "number",
          },
        },
        {
          name: "limit",
          in: "query",
          required: false,
          description: "Limit of posts per page.",
          schema: {
            type: "number",
          },
        },
        {
          name: "isDraft",
          in: "query",
          required: false,
          description: "Filter posts by draft.",
          schema: {
            type: "boolean",
          },
        },
        {
          name: "order",
          in: "query",
          required: false,
          description: "Order of posts.",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
          },
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
              "updatedAt",
            ],
          },
        },
      ],
      responses: {
        ...postResponse.readByUser,
      },
    },
  },
};

export default postPaths;

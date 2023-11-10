import { commentResponse } from "../responses";

const commentPaths = {
  "/comment": {
    post: {
      tags: ["Comment"],
      summary: "Create a comment.",
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
              $ref: "#/components/schemas/comment",
            },
            example: {
              content: "This is a comment.",
              postId: "60f2c8e9c3e5d60015c4a3c5",
              authorId: "60f2c8e9c3e5d60015c4a3c4",
            },
          },
        },
      },
      responses: {
        ...commentResponse.create,
      },
    },

    get: {
      tags: ["Comment"],
      summary: "Read all comments.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "number",
          },
          required: false,
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "number",
          },
          required: false,
        },
        {
          in: "query",
          name: "isEdited",
          schema: {
            type: "boolean",
          },
          required: false,
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
              "createdAt",
            ],
          },
          required: false,
        },
        {
          in: "query",
          name: "order",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
          },
          required: false,
        },
        {
          in: "query",
          name: "search",
          schema: {
            type: "string",
          },
          required: false,
        },
      ],
      responses: {
        ...commentResponse.readAll,
      },
    },
  },

  "/comment/{id}": {
    parameters: [
      {
        in: "path",
        name: "id",
        schema: {
          type: "string",
        },
        required: true,
      },
    ],

    get: {
      tags: ["Comment"],
      summary: "Read a comment.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        ...commentResponse.read,
      },
    },

    patch: {
      tags: ["Comment"],
      summary: "Update a comment.",
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
              $ref: "#/components/schemas/comment",
            },
            example: {
              content: "This is a comment modified.",
            },
          },
        },
      },
      responses: {
        ...commentResponse.update,
      },
    },

    delete: {
      tags: ["Comment"],
      summary: "Delete a comment.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        ...commentResponse.delete,
      },
    },
  },

  "/comment/user/{id}": {
    parameters: [
      {
        in: "path",
        name: "id",
        schema: {
          type: "string",
        },
        required: true,
      },
    ],

    get: {
      tags: ["Comment"],
      summary: "Read all comments by user.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "number",
          },
          required: false,
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "number",
          },
          required: false,
        },
        {
          in: "query",
          name: "isEdited",
          schema: {
            type: "boolean",
          },
          required: false,
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
              "createdAt",
            ],
          },
          required: false,
        },
        {
          in: "query",
          name: "order",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
          },
          required: false,
        },
      ],
      responses: {
        ...commentResponse.readByUser,
      },
    },
  },

  "/comment/post/{id}": {
    parameters: [
      {
        in: "path",
        name: "id",
        schema: {
          type: "string",
        },
        required: true,
      },
    ],

    get: {
      tags: ["Comment"],
      summary: "Read all comments by post.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "number",
          },
          required: false,
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "number",
          },
          required: false,
        },
        {
          in: "query",
          name: "isEdited",
          schema: {
            type: "boolean",
          },
          required: false,
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
              "createdAt",
            ],
          },
          required: false,
        },
        {
          in: "query",
          name: "order",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
          },
          required: false,
        },
      ],
      responses: {
        ...commentResponse.readByPost,
      },
    },
  },
};

export default commentPaths;

const postSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
    },
    title: {
      type: "string",
    },
    content: {
      type: "string",
    },
    published: {
      type: "boolean",
    },
    authorId: {
      type: "string",
    },
  },
  required: ["title", "content", "authorId"],
};

export default postSchema;

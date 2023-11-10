const commentSchema = {
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
    edited: {
      type: "boolean",
    },
    content: {
      type: "string",
    },
    authorId: {
      type: "string",
    },
    postId: {
      type: "string",
    },
    commentParentId: {
      type: "string",
    },
  },
  required: ["content", "authorId", "postId"],
};

export default commentSchema;

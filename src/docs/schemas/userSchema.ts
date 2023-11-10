const userSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    image: {
      type: "string",
    },
    acceptedTerms: {
      type: "boolean",
    },
    emailVerified: {
      type: "boolean",
    },
    emailVerifyToken: {
      type: "string",
    },
    emailVerifyExpiry: {
      type: "string",
      format: "date-time",
    },
    role: {
      type: "string",
      enum: ["ADMIN", "USER"],
    },
  },
  required: ["name", "email", "password", "acceptedTerms"],
};

export default userSchema;

import { commentSchema, postSchema, userSchema } from "./schemas";
import {
  commentPaths,
  postPaths,
  userPaths,
  authPaths,
  mailPaths,
} from "./paths";

export default {
  openapi: "3.0.0",
  info: {
    title: "Capyba Software Challenge API.",
    description: "API for back challenge of Capyba Software.",
    version: "1.0.0",
  },

  servers: [
    {
      url: "http://localhost:3001",
      description: "Local Server",
    },
  ],

  paths: {
    ...commentPaths,
    ...postPaths,
    ...userPaths,
    ...authPaths,
    ...mailPaths,
  },

  components: {
    schemas: {
      user: userSchema,
      post: postSchema,
      comment: commentSchema,
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    security: {
      bearerAuth: [],
    },
  },
};

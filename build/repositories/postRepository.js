"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/repositories/postRepository.ts
var postRepository_exports = {};
__export(postRepository_exports, {
  default: () => postRepository_default
});
module.exports = __toCommonJS(postRepository_exports);

// src/database/client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "error"] : []
});
var client_default = prisma;

// src/repositories/postRepository.ts
var PostRepository = class {
  async create(data) {
    const post = await client_default.post.create({
      data
    });
    return post;
  }
  async findById(id) {
    const post = await client_default.post.findUnique({
      where: {
        id
      }
    });
    return post;
  }
  async findByUser(userId, page, limit, isDraft, orderField, order) {
    const posts = await client_default.post.findMany({
      where: {
        AND: [
          {
            authorId: userId
          },
          {
            published: isDraft || void 0
          }
        ]
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    });
    const count = await client_default.post.count({
      where: {
        AND: [
          {
            authorId: userId
          },
          {
            published: isDraft || void 0
          }
        ]
      }
    });
    return { posts, count };
  }
  async findByText(search, page, limit, isDraft, orderField, order) {
    const posts = await client_default.post.findMany({
      where: {
        AND: [
          {
            published: isDraft || void 0
          },
          {
            OR: [
              {
                content: {
                  contains: search,
                  mode: "insensitive"
                }
              },
              {
                title: {
                  contains: search,
                  mode: "insensitive"
                }
              }
            ]
          }
        ]
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    });
    const count = await client_default.post.count({
      where: {
        AND: [
          {
            published: isDraft || void 0
          },
          {
            OR: [
              {
                content: {
                  contains: search,
                  mode: "insensitive"
                }
              },
              {
                title: {
                  contains: search,
                  mode: "insensitive"
                }
              }
            ]
          }
        ]
      }
    });
    return { posts, count };
  }
  async findAll(page, limit, isDraft, orderField, order) {
    const posts = await client_default.post.findMany({
      where: {
        published: isDraft
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    });
    const count = await client_default.post.count({
      where: {
        published: isDraft
      }
    });
    return { posts, count };
  }
  async update(id, data) {
    const post = await client_default.post.update({
      where: {
        id
      },
      data
    });
    return post;
  }
  async delete(id) {
    const post = await client_default.post.delete({
      where: {
        id
      }
    });
    return post;
  }
};
var postRepository_default = new PostRepository();

import { Post, Prisma } from "@prisma/client";
import { IPostRepository } from "./IRepositories";
import prisma from "../database/client";

class PostRepository implements IPostRepository {
  async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    const post = await prisma.post.create({
      data,
    });

    return post;
  }

  async findById(id: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  }

  async findByUser(
    userId: string,
    page: number,
    limit: number,
    isDraft?: boolean,
    orderField?: Prisma.PostScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ posts: Post[]; count: number }> {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          {
            authorId: userId,
          },
          {
            published: isDraft || false,
          },
        ],
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const count = await prisma.post.count({
      where: {
        AND: [
          {
            authorId: userId,
          },
          {
            published: isDraft || false,
          },
        ],
      },
    });

    return { posts, count };
  }

  async findByText(
    search: string,
    page: number,
    limit: number,
    isDraft?: boolean,
    orderField?: Prisma.PostScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ posts: Post[]; count: number }> {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          {
            published: isDraft || false,
          },
          {
            OR: [
              {
                content: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const count = await prisma.post.count({
      where: {
        AND: [
          {
            published: isDraft || false,
          },
          {
            OR: [
              {
                content: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
    });

    return { posts, count };
  }

  async findAll(
    page: number,
    limit: number,
    isDraft?: boolean,
    orderField?: Prisma.PostScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ posts: Post[]; count: number }> {
    const posts = await prisma.post.findMany({
      where: {
        published: isDraft,
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const count = await prisma.post.count({
      where: {
        published: isDraft,
      },
    });

    return { posts, count };
  }

  async update(
    id: string,
    data: Prisma.PostUncheckedUpdateWithoutAuthorInput,
  ): Promise<Post> {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data,
    });

    return post;
  }

  async delete(id: string): Promise<Post> {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });

    return post;
  }
}

export default new PostRepository();

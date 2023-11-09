import { Post, Prisma } from "@prisma/client";
import { IPostsRepository } from "./IRepositories/IPostsRepository";
import prisma from "../database/client";

class PostRepository implements IPostsRepository {
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
  ): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return posts;
  }

  async findByText(
    search: string,
    page: number,
    limit: number,
  ): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        content: {
          contains: search,
        },
        title: {
          contains: search,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return posts;
  }

  async findAll(page: number, limit: number): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return posts;
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

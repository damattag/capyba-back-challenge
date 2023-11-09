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

  async findByTitle(title: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        title,
      },
    });

    return posts;
  }

  async findByContent(content: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        content,
      },
    });

    return posts;
  }

  async findAll() {
    const posts = await prisma.post.findMany();

    return posts;
  }

  async update(
    data: Prisma.PostUncheckedUpdateWithoutAuthorInput,
  ): Promise<Post> {
    const post = await prisma.post.update({
      where: {
        id: data.id as string,
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

export default PostRepository;

import { Prisma, Comment } from "@prisma/client";
import { ICommentRepository } from "./IRepositories";
import prisma from "../database/client";

class CommentRepository implements ICommentRepository {
  async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    const comment = await prisma.comment.create({
      data,
    });

    return comment;
  }

  async findAll(
    page: number,
    limit: number,
    isEdited?: boolean,
    orderField?: Prisma.CommentScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ comments: Comment[]; count: number }> {
    const comments = await prisma.comment.findMany({
      where: {
        edited: isEdited,
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const count = await prisma.comment.count({
      where: {
        edited: isEdited,
      },
    });

    return { comments, count };
  }

  async findByPost(
    postId: string,
    page: number,
    limit: number,
    isEdited?: boolean,
    orderField?: Prisma.CommentScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ comments: Comment[]; count: number }> {
    const comments = await prisma.comment.findMany({
      where: {
        AND: [
          {
            postId,
          },
          {
            edited: isEdited,
          },
        ],
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const count = await prisma.comment.count({
      where: {
        AND: [
          {
            postId,
          },
          {
            edited: isEdited,
          },
        ],
      },
    });

    return { comments, count };
  }

  async findByUser(
    userId: string,
    page: number,
    limit: number,
    isEdited?: boolean,
    orderField?: Prisma.CommentScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ comments: Comment[]; count: number }> {
    const comments = await prisma.comment.findMany({
      where: {
        AND: [
          {
            authorId: userId,
          },
          {
            edited: isEdited,
          },
        ],
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const count = await prisma.comment.count({
      where: {
        AND: [
          {
            authorId: userId,
          },
          {
            edited: isEdited,
          },
        ],
      },
    });

    return { comments, count };
  }

  async findById(id: string): Promise<Comment | null> {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    return comment;
  }

  async findByText(
    text: string,
    page: number,
    limit: number,
    isEdited?: boolean,
    orderField?: Prisma.CommentScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ comments: Comment[]; count: number }> {
    const comments = await prisma.comment.findMany({
      where: {
        AND: [
          {
            content: {
              contains: text,
              mode: "insensitive",
            },
          },
          {
            edited: isEdited,
          },
        ],
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const count = await prisma.comment.count({
      where: {
        AND: [
          {
            content: {
              contains: text,
              mode: "insensitive",
            },
          },
          {
            edited: isEdited,
          },
        ],
      },
    });

    return { comments, count };
  }

  async update(
    id: string,
    data: Prisma.CommentUncheckedUpdateInput,
  ): Promise<Comment> {
    const comment = await prisma.comment.update({
      where: {
        id,
      },
      data,
    });

    return comment;
  }

  async delete(id: string): Promise<void> {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}

export default CommentRepository;

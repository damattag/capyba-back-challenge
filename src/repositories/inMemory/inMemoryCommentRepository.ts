import { Comment, Prisma } from "@prisma/client";
import { ICommentRepository } from "../IRepositories";
import { randomUUID } from "node:crypto";

class InMemoryCommentRepository implements ICommentRepository {
  public items: Comment[] = [];

  async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    const comment = {
      id: randomUUID() as string,
      createdAt: new Date(),
      content: data.content,
      authorId: data.authorId as string,
      postId: data.postId as string,
      edited: false,
      commentParentId: data.commentParentId as string | null,
    };

    this.items.push(comment);

    return comment;
  }

  async findById(id: string): Promise<Comment | null> {
    const comment = this.items.find((item) => item.id === id);

    return comment || null;
  }

  async findByPost(
    postId: string,
    page: number,
    limit: number,
    isEdited?: boolean,
    orderField?: Prisma.CommentScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ comments: Comment[]; count: number }> {
    const comments =
      isEdited === undefined
        ? this.items
            .filter((item) => item.postId === postId)
            .slice((page - 1) * limit, page * limit)
        : this.items
            .filter(
              (item) => item.postId === postId && item.edited === isEdited,
            )
            .slice((page - 1) * limit, page * limit);

    const count = comments.length;

    if (orderField) {
      comments.sort((a, b) => {
        if (order === "asc") {
          return a[orderField] > b[orderField] ? 1 : -1;
        }
        return a[orderField] < b[orderField] ? 1 : -1;
      });
    }

    return { comments, count };
  }

  async findAll(
    page: number,
    limit: number,
    isEdited?: boolean,
    orderField?: Prisma.CommentScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ comments: Comment[]; count: number }> {
    const comments =
      isEdited === undefined
        ? this.items.slice((page - 1) * limit, page * limit)
        : this.items
            .filter((item) => item.edited === isEdited)
            .slice((page - 1) * limit, page * limit);

    const count = comments.length;

    if (orderField) {
      comments.sort((a, b) => {
        if (order === "asc") {
          return a[orderField] > b[orderField] ? 1 : -1;
        }
        return a[orderField] < b[orderField] ? 1 : -1;
      });
    }

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
    const comments =
      isEdited === undefined
        ? this.items
            .filter((item) => item.authorId === userId)
            .slice((page - 1) * limit, page * limit)
        : this.items
            .filter(
              (item) => item.authorId === userId && item.edited === isEdited,
            )
            .slice((page - 1) * limit, page * limit);

    const count = comments.length;

    if (orderField) {
      comments.sort((a, b) => {
        if (order === "asc") {
          return a[orderField] > b[orderField] ? 1 : -1;
        }
        return a[orderField] < b[orderField] ? 1 : -1;
      });
    }

    return { comments, count };
  }

  async findByText(
    text: string,
    page: number,
    limit: number,
    isEdited?: boolean,
    orderField?: Prisma.CommentScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ comments: Comment[]; count: number }> {
    const comments =
      isEdited === undefined
        ? this.items
            .filter((item) => item.content.includes(text))
            .slice((page - 1) * limit, page * limit)
        : this.items
            .filter(
              (item) => item.content.includes(text) && item.edited === isEdited,
            )
            .slice((page - 1) * limit, page * limit);

    const count = comments.length;

    if (orderField) {
      comments.sort((a, b) => {
        if (order === "asc") {
          return a[orderField] > b[orderField] ? 1 : -1;
        }
        return a[orderField] < b[orderField] ? 1 : -1;
      });
    }

    return { comments, count };
  }

  async update(
    id: string,
    data: Prisma.CommentUncheckedUpdateInput,
  ): Promise<Comment> {
    const comment = this.items.find((item) => item.id === id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    const index = this.items.indexOf(comment);

    this.items[index] = {
      id: comment.id,
      createdAt: comment.createdAt,
      content: (data.content as string) || comment.content,
      authorId: comment.authorId,
      postId: comment.postId,
      edited: true,
      commentParentId: comment.commentParentId,
    };

    return this.items[index];
  }

  async delete(id: string): Promise<Comment> {
    const comment = this.items.find((item) => item.id === id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    this.items = this.items.filter((item) => item.id !== id);

    return comment;
  }
}

export default InMemoryCommentRepository;

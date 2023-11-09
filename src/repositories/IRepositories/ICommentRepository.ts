import { Prisma, Comment } from "@prisma/client";

export interface ICommentRepository {
  create: (data: Prisma.CommentUncheckedCreateInput) => Promise<Comment>;

  findById: (id: string) => Promise<Comment | null>;

  findByPost: (
    postId: string,
    page: number,
    limit: number,
    isEdited?: boolean,
    orderField?: Prisma.CommentScalarFieldEnum,
    order?: Prisma.SortOrder,
  ) => Promise<{ comments: Comment[]; count: number }>;

  findAll: (
    page: number,
    limit: number,
    isEdited?: boolean,
    orderField?: Prisma.CommentScalarFieldEnum,
    order?: Prisma.SortOrder,
  ) => Promise<{ comments: Comment[]; count: number }>;

  findByUser: (
    userId: string,
    page: number,
    limit: number,
    isEdited?: boolean,
    orderField?: Prisma.CommentScalarFieldEnum,
    order?: Prisma.SortOrder,
  ) => Promise<{ comments: Comment[]; count: number }>;

  findByText: (
    text: string,
    page: number,
    limit: number,
    isEdited?: boolean,
    orderField?: Prisma.CommentScalarFieldEnum,
    order?: Prisma.SortOrder,
  ) => Promise<{ comments: Comment[]; count: number }>;

  update: (
    id: string,
    data: Prisma.CommentUncheckedUpdateInput,
  ) => Promise<Comment>;

  delete: (id: string) => Promise<void>;
}

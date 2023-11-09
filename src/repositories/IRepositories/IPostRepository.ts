import { Post, Prisma } from "@prisma/client";

export interface IPostRepository {
  create: (data: Prisma.PostUncheckedCreateInput) => Promise<Post>;

  findById: (id: string) => Promise<Post | null>;

  findByText: (
    text: string,
    page: number,
    limit: number,
    isDraft?: boolean,
    orderField?: Prisma.PostScalarFieldEnum,
    order?: Prisma.SortOrder,
  ) => Promise<{ posts: Post[]; count: number }>;

  findAll: (
    page: number,
    limit: number,
    isDraft?: boolean,
    orderField?: Prisma.PostScalarFieldEnum,
    order?: Prisma.SortOrder,
  ) => Promise<{ posts: Post[]; count: number }>;

  findByUser: (
    userId: string,
    page: number,
    limit: number,
    isDraft?: boolean,
    orderField?: Prisma.PostScalarFieldEnum,
    order?: Prisma.SortOrder,
  ) => Promise<{ posts: Post[]; count: number }>;

  update: (id: string, data: Prisma.PostUncheckedUpdateInput) => Promise<Post>;

  delete: (id: string) => Promise<Post>;
}

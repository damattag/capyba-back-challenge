import { Post, Prisma } from "@prisma/client";

export interface IPostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  findByText(text: string, page: number, limit: number): Promise<Post[]>;
  findAll(page: number, limit: number): Promise<Post[]>;
  findByUser(userId: string, page: number, limit: number): Promise<Post[]>;
  update(
    id: string,
    data: Prisma.PostUncheckedUpdateWithoutAuthorInput,
  ): Promise<Post>;
  delete(id: string): Promise<Post>;
}

import { Post, Prisma } from "@prisma/client";

export interface IPostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  findByTitle(title: string): Promise<Post[]>;
  findByContent(content: string): Promise<Post[]>;
  findAll(): Promise<Post[]>;
  update(data: Prisma.PostUncheckedUpdateWithoutAuthorInput): Promise<Post>;
  delete(id: string): Promise<Post>;
}

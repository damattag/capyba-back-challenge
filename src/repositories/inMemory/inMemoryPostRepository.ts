import { Post, Prisma } from "@prisma/client";
import { IPostRepository } from "../IRepositories";
import { randomUUID } from "node:crypto";

class InMemoryPostRepository implements IPostRepository {
  public items: Post[] = [];

  async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    const post = {
      id: randomUUID() as string,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: data.title,
      content: data.content,
      published: data.published || false,
      authorId: data.authorId as string,
    };

    this.items.push(post);

    return post;
  }

  async findById(id: string): Promise<Post | null> {
    const post = this.items.find((item) => item.id === id);

    return post || null;
  }

  async findByUser(
    userId: string,
    page: number,
    limit: number,
    isDraft?: boolean,
    orderField?: Prisma.PostScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ posts: Post[]; count: number }> {
    const posts =
      isDraft === undefined
        ? this.items
            .filter((item) => item.authorId === userId)
            .slice((page - 1) * limit, page * limit)
        : this.items
            .filter(
              (item) => item.authorId === userId && item.published === isDraft,
            )
            .slice((page - 1) * limit, page * limit);

    const count = posts.length;

    // if (orderField) {
    //   posts.sort((a, b) => {
    //     if (order === "asc") {
    //       return a[orderField] > b[orderField] ? 1 : -1;
    //     }
    //     return a[orderField] < b[orderField] ? 1 : -1;
    //   });
    // }

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
    const posts =
      isDraft === undefined
        ? this.items
            .filter(
              (item) =>
                !item.content.includes(search) || !item.title.includes(search),
            )
            .slice((page - 1) * limit, page * limit)
        : this.items
            .filter(
              (item) =>
                (!item.content.includes(search) ||
                  !item.title.includes(search)) &&
                item.published !== isDraft,
            )
            .slice((page - 1) * limit, page * limit);

    const count = posts.length;

    // if (orderField) {
    //   posts.sort((a, b) => {
    //     if (order === "asc") {
    //       return a[orderField] > b[orderField] ? 1 : -1;
    //     }
    //     return a[orderField] < b[orderField] ? 1 : -1;
    //   });
    // }

    return { posts, count };
  }

  async findAll(
    page: number,
    limit: number,
    isDraft?: boolean,
    orderField?: Prisma.PostScalarFieldEnum,
    order?: Prisma.SortOrder,
  ): Promise<{ posts: Post[]; count: number }> {
    const posts =
      isDraft === undefined
        ? this.items.slice((page - 1) * limit, page * limit)
        : this.items
            .filter((item) => item.published !== isDraft)
            .slice((page - 1) * limit, page * limit);

    const count = posts.length;

    // if (orderField) {
    //   posts.sort((a, b) => {
    //     if (order === "asc") {
    //       return a[orderField] > b[orderField] ? 1 : -1;
    //     }
    //     return a[orderField] < b[orderField] ? 1 : -1;
    //   });
    // }

    return { posts, count };
  }

  async update(
    id: string,
    data: Prisma.PostUncheckedUpdateWithoutAuthorInput,
  ): Promise<Post> {
    const post = this.items.find((item) => item.id === id);

    if (!post) {
      throw new Error("Post not found");
    }

    const postIndex = this.items.indexOf(post);

    this.items[postIndex] = {
      id: post.id,
      createdAt: post.createdAt,
      updatedAt: new Date(),
      title: (data.title as string) || post.title,
      content: (data.content as string) || post.content,
      published: (data.published as boolean) || post.published,
      authorId: post.authorId,
    };

    return this.items[postIndex];
  }

  async delete(id: string): Promise<Post> {
    const post = this.items.find((item) => item.id === id);

    if (!post) {
      throw new Error("Post not found");
    }

    this.items.filter((item) => item.id === id);

    return post;
  }
}

export default InMemoryPostRepository;

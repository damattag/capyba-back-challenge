import { Prisma, User } from "@prisma/client";
import { IUserRepository } from "../IRepositories";
import { randomUUID } from "node:crypto";

class InMemoryUserRepository implements IUserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID() as string,
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.image,
      acceptedTerms: data.acceptedTerms,
      emailVerified: data.emailVerified || false,
      emailVerifyToken: data.emailVerifyToken || null,
      emailVerifyExpiry: (data.emailVerifyExpiry as Date) || null,
      role: data.role || "USER",
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    return user || null;
  }

  async findAll(): Promise<User[]> {
    return this.items;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = {
      id: user.id,
      name: (data.name as string) || user.name,
      email: (data.email as string) || user.email,
      password: (data.password as string) || user.password,
      image: (data.image as string) || user.image,
      acceptedTerms: (data.acceptedTerms as boolean) || user.acceptedTerms,
      emailVerified: (data.emailVerified as boolean) || user.emailVerified,
      emailVerifyToken:
        (data.emailVerifyToken as string) || user.emailVerifyToken,
      emailVerifyExpiry:
        (data.emailVerifyExpiry as Date) || user.emailVerifyExpiry,
      role: user.role,
    };

    this.items = this.items.map((item) =>
      item.id === id ? updatedUser : item,
    );

    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    this.items = this.items.filter((item) => item.id !== id);

    return user;
  }
}

export default InMemoryUserRepository;

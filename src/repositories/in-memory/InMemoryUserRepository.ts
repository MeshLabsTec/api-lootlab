import type { User, Prisma } from "@prisma/client";
import type { IUserRepository } from "../interfaceRepository/IUserRepository";
import { randomUUID } from "crypto";
import { UserNotFoundError } from "@/useCases/@erros/User/UserNotFoundError";

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: data.id ?? randomUUID(),
      email: data.email || null,
      name: data.name || null,
      password: data.password || null,
      role: data.role || "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findMany(): Promise<User[]> {
    return this.users;
  }

  async updateById(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new UserNotFoundError();
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...data,
      updatedAt: new Date(),
    } as User;

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
}

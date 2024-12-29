import type { Prisma, User } from "@prisma/client";

export interface IUserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findMany(): Promise<User[]>;
  updateById(id: string, data: Prisma.UserUpdateInput): Promise<User>;
}

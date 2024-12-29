import { prisma } from "@/lib/prisma";
import type { IUserRepository } from "../interfaceRepository/IUserRepository";
import type { Prisma } from "@prisma/client";

export class PrismaUserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });
    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findMany() {
    const users = await prisma.user.findMany();
    return users;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async updateById(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return user;
  }
}

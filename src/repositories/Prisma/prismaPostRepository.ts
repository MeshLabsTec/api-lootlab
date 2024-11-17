import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { IPostRepository } from "../interfaceRepository/IPostRepository";

export class PrismaPostRepository implements IPostRepository {
  async create(data: Prisma.PostUncheckedCreateInput) {
    const user = await prisma.post.create({ data });
    return user;
  }

  async findById(id: string) {
    const user = await prisma.post.findUnique({
      where: { id },
    });
    return user;
  }

  async findMany() {
    const users = await prisma.post.findMany();
    return users;
  }
}

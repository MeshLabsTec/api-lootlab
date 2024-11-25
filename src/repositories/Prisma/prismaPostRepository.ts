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
      where: {
        id,
      },
      include: {
        links: true,
        ProjectFeatures: true,
        LaunchInfo: true,
        partnerships: true,
      },
    });
    return user;
  }

  async findMany() {
    const users = await prisma.post.findMany({
      include: {
        links: true,
        ProjectFeatures: true,
        LaunchInfo: true,
        partnerships: true,
      },
    });
    return users;
  }
}

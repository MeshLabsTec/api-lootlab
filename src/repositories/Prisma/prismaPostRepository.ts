import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { IPostRepository } from "../interfaceRepository/IPostRepository";

export class PrismaPostRepository implements IPostRepository {
  async create(data: Prisma.PostUncheckedCreateInput) {
    const user = await prisma.post.create({ data });
    return user;
  }

  async findById(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        links: true,
        ProjectFeatures: true,
        launchInfo: true,
        partnerships: true,
        Image: true,
        genres: true,
        author: true,
      },
    });
    return post;
  }

  async findBySlug(slug: string) {
    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
      include: {
        links: true,
        ProjectFeatures: true,
        launchInfo: true,
        partnerships: true,
        Image: true,
        genres: true,
        author: true,
      },
    });
    return post;
  }

  async findMany() {
    const posts = await prisma.post.findMany({
      include: {
        links: true,
        ProjectFeatures: true,
        launchInfo: true,
        partnerships: true,
        Image: true,
        genres: true,
      },
    });
    return posts;
  }
}

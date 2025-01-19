import { prisma } from "@/lib/prisma";
import type { Post, Prisma } from "@prisma/client";
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
        author: true,
      },
    });
    return post;
  }

  async findByTitle(title: string) {
    const post = await prisma.post.findFirst({
      where: {
        title,
      },
      include: {
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
        author: true,
      },
    });
    return post;
  }

  async findMany(category?: string) {
    const where = category ? { category } : undefined;

    const posts = await prisma.post.findMany({
      where,
    });
    return posts;
  }

  async updateById(id: string, data: Prisma.PostUncheckedUpdateInput) {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data,
    });
    return post;
  }

  async deleteById(id: string): Promise<Post> {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });
    return post;
  }
}

import type { Post, Prisma } from "@prisma/client";

export interface IPostRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  findBySlug(slug: string): Promise<Post | null>;
  findMany(): Promise<Post[]>;
}

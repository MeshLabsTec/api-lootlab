import { PrismaPostRepository } from "@/repositories/Prisma/prismaPostRepository";
import { FindBySlugPostUseCase } from "@/useCases/Posts/findBySlugUseCase";

export function makeFindBySlugUseCase() {
  const prismaPostRepository = new PrismaPostRepository();
  const findManyPosts = new FindBySlugPostUseCase(prismaPostRepository);
  return findManyPosts;
}

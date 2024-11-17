import { PrismaPostRepository } from "@/repositories/Prisma/prismaPostRepository";
import { FindManyPostUseCase } from "@/useCases/Posts/findManyPostUseCase";

export function makeFindManyPostUseCase() {
  const prismaPostRepository = new PrismaPostRepository();
  const findManyPosts = new FindManyPostUseCase(prismaPostRepository);
  return findManyPosts;
}

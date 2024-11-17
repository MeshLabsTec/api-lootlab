import { PrismaPostRepository } from "@/repositories/Prisma/prismaPostRepository";
import { FindByIdPostUseCase } from "@/useCases/Posts/findByIdPostUseCase";

export function makeFindByIdPostUseCase() {
  const prismaPostRepository = new PrismaPostRepository();
  const findManyPosts = new FindByIdPostUseCase(prismaPostRepository);
  return findManyPosts;
}

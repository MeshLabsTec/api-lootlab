import { PrismaPostRepository } from "@/repositories/Prisma/prismaPostRepository";
import { DeleteByIdUseCase } from "@/useCases/Posts/deleteByIdUseCase";

export function makeDeleteByIdPostUseCase() {
  const prismaPostRepository = new PrismaPostRepository();
  const findManyPosts = new DeleteByIdUseCase(prismaPostRepository);
  return findManyPosts;
}

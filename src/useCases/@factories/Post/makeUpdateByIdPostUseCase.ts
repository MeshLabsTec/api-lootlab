import { PrismaPostRepository } from "@/repositories/Prisma/prismaPostRepository";
import { UpdateByIdPostUseCase } from "@/useCases/Posts/updateByIdPostUseCase";

export function makeUpdateByIdPostUseCase() {
  const prismaPostRepository = new PrismaPostRepository();
  const findManyPosts = new UpdateByIdPostUseCase(prismaPostRepository);
  return findManyPosts;
}

import { PrismaPostRepository } from "@/repositories/Prisma/prismaPostRepository";
import { PostUpdateUseCase } from "@/useCases/Posts/updateByIdPostUseCase";

export function makeUpdateByIdPostUseCase() {
  const prismaRepositoryPost = new PrismaPostRepository();
  const findManyPosts = new PostUpdateUseCase(prismaRepositoryPost);
  return findManyPosts;
}

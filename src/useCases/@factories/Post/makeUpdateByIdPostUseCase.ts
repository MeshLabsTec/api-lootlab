import { PostUpdateUseCase } from "@/useCases/Posts/updateByIdPostUseCase";
import { PrismaClient } from "@prisma/client";

export function makeUpdateByIdPostUseCase() {
  const findManyPosts = new PostUpdateUseCase(new PrismaClient());
  return findManyPosts;
}

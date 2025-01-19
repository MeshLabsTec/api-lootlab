import { PrismaPostRepository } from "@/repositories/Prisma/prismaPostRepository";
import { CreatePostUseCase } from "@/useCases/Posts/createPostUseCase";

export function makeCreatePostUseCase() {
  const prismaPostRepository = new PrismaPostRepository();
  const createPostrUseCase = new CreatePostUseCase(prismaPostRepository);
  return createPostrUseCase;
}

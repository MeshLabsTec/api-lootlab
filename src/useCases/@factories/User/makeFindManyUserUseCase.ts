import { PrismaUserRepository } from "@/repositories/Prisma/prismaUserRepository";
import { FindManyUserUseCase } from "@/useCases/User/findManyUserUseCase";

export function makeFindManyUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository();
  const createUserUseCase = new FindManyUserUseCase(prismaUserRepository);
  return createUserUseCase;
}

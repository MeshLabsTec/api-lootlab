import { PrismaUserRepository } from "@/repositories/Prisma/prismaUserRepository";
import { CreateUserUseCase } from "@/useCases/User/createUserUseCase";

export function makeCreateUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(prismaUserRepository);
  return createUserUseCase;
}

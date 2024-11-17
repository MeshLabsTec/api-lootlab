import { PrismaUserRepository } from "@/repositories/Prisma/prismaUserRepository";
import { LoginUserUseCase } from "@/useCases/User/loginUserUseCase";

export function makeLoginUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository();
  const createUserUseCase = new LoginUserUseCase(prismaUserRepository);
  return createUserUseCase;
}

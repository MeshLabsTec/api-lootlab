import { PrismaUserRepository } from "@/repositories/Prisma/prismaUserRepository";
import { FindByIdUserUseCase } from "@/useCases/User/findByIdUserUseCase";

export function makeFindByIdUseCase() {
  const prismaUserRepository = new PrismaUserRepository();
  const createUserUseCase = new FindByIdUserUseCase(prismaUserRepository);
  return createUserUseCase;
}

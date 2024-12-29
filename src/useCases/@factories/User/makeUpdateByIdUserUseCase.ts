import { PrismaUserRepository } from "@/repositories/Prisma/prismaUserRepository";
import { UpdateByIdUserUseCase } from "@/useCases/User/updateByIdUserUseCase";

export function makeUpdateByIdUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository();
  const createUserUseCase = new UpdateByIdUserUseCase(prismaUserRepository);
  return createUserUseCase;
}

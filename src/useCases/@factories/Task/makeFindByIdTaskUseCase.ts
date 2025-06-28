import { PrismaTaskRepository } from "@/repositories/Prisma/prismaTaskRepository";
import { FindByIdTaskUseCase } from "@/useCases/Task/findByIdTaskUseCase";

export function makeFindByIdTaskUseCase() {
  const prismaTaskRepository = new PrismaTaskRepository();
  const findByIdTaskUseCase = new FindByIdTaskUseCase(prismaTaskRepository);
  return findByIdTaskUseCase;
}

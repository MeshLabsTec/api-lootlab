import { PrismaTaskRepository } from "@/repositories/Prisma/prismaTaskRepository";
import { DeleteByIdTaskUseCase } from "@/useCases/Task/deleteByIdTaskUseCase";

export function makeDeleteByIdTaskUseCase() {
  const prismaTaskRepository = new PrismaTaskRepository();
  const deleteByIdTaskUseCase = new DeleteByIdTaskUseCase(prismaTaskRepository);
  return deleteByIdTaskUseCase;
}

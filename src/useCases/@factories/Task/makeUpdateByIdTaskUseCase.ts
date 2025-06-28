import { PrismaTaskRepository } from "@/repositories/Prisma/prismaTaskRepository";
import { UpdateByIdTaskUseCase } from "@/useCases/Task/updateByIdTaskUseCase";

export function makeUpdateByIdTaskUseCase() {
  const prismaTaskRepository = new PrismaTaskRepository();
  const updateByIdTaskUseCase = new UpdateByIdTaskUseCase(prismaTaskRepository);
  return updateByIdTaskUseCase;
}

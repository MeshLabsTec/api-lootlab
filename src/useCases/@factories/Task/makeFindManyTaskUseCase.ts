import { PrismaTaskRepository } from "@/repositories/Prisma/prismaTaskRepository";
import { FindManyTaskUseCase } from "@/useCases/Task/findManyTaskUseCase";

export function makeFindManyTaskUseCase() {
  const prismaTaskRepository = new PrismaTaskRepository();
  const findManyTaskUseCase = new FindManyTaskUseCase(prismaTaskRepository);
  return findManyTaskUseCase;
}

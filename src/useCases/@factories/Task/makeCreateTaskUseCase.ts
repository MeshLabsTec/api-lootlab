import { PrismaTaskRepository } from "@/repositories/Prisma/prismaTaskRepository";
import { CreateTaskUseCase } from "@/useCases/Task/createTaskUseCase";

export function makeCreateTaskUseCase() {
  const prismaTaskRepository = new PrismaTaskRepository();
  const createTaskUseCase = new CreateTaskUseCase(prismaTaskRepository);
  return createTaskUseCase;
}

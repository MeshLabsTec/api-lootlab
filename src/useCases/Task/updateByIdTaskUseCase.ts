import type { ITaskRepository } from "@/repositories/interfaceRepository/ITaskRepository";
import type { Prisma } from "@prisma/client";
import { TaskNotFoundError } from "../@erros/Task/TaskNotFoundError";
import { TaskAlreadyExistsError } from "../@erros/Task/TaskAlreadyExistsError";
import { prisma } from "@/lib/prisma";

export class UpdateByIdTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string, data: Prisma.TaskUpdateInput) {
    // Verificar se a tarefa existe
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new TaskNotFoundError();
    }

    // Se está atualizando o nome, verificar se não há conflito
    if (data.name && data.name !== existingTask.name) {
      const taskWithSameName = await prisma.task.findFirst({
        where: {
          name: data.name as string,
          seasonId: existingTask.seasonId,
          id: { not: id },
        },
      });

      if (taskWithSameName) {
        throw new TaskAlreadyExistsError();
      }
    }

    const task = await this.taskRepository.updateById(id, data);
    return task;
  }
}

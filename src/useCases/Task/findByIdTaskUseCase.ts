import type { ITaskRepository } from "@/repositories/interfaceRepository/ITaskRepository";
import { TaskNotFoundError } from "../@erros/Task/TaskNotFoundError";

export class FindByIdTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new TaskNotFoundError();
    }

    return task;
  }
}

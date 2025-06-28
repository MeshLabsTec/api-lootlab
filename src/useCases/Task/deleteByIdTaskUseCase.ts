import type { ITaskRepository } from "@/repositories/interfaceRepository/ITaskRepository";
import { TaskNotFoundError } from "../@erros/Task/TaskNotFoundError";

export class DeleteByIdTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new TaskNotFoundError();
    }

    await this.taskRepository.deleteById(id);
  }
}

import type { ITaskRepository } from "@/repositories/interfaceRepository/ITaskRepository";

export class FindManyTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(seasonId?: string) {
    const tasks = await this.taskRepository.findMany(seasonId);
    return tasks;
  }
}

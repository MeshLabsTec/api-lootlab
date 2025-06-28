import type { ITaskRepository } from "@/repositories/interfaceRepository/ITaskRepository";
import type { Prisma } from "@prisma/client";
import { TaskAlreadyExistsError } from "../@erros/Task/TaskAlreadyExistsError";
import { InvalidSeasonError } from "../@erros/Task/InvalidSeasonError";
import { IBattlePassSeasonRepository } from "@/repositories/interfaceRepository/IBattlePassSeason";

export class CreateTaskUseCase {
  constructor(
    private taskRepository: ITaskRepository,
    private seasonRepository: IBattlePassSeasonRepository,
  ) {}

  async execute(data: Prisma.TaskCreateInput) {
    const seasonId = data.season.connect?.id;

    if (!seasonId) {
      throw new InvalidSeasonError();
    }

    // Verificar se a temporada existe
    const season = await this.seasonRepository.findById(seasonId);

    if (!season) {
      throw new InvalidSeasonError();
    }

    // Verificar se já existe uma tarefa com mesmo nome para esta temporada
    const existingTask = await this.taskRepository.findBySeasonId(seasonId);

    console.log(existingTask);

    if (existingTask) {
      throw new TaskAlreadyExistsError();
    }

    const task = await this.taskRepository.create(data);
    return task;
  }
}

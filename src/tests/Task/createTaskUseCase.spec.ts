import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryTaskRepository } from "@/repositories/in-memory/InMemoryTaskRepository";
import { InMemoryBattlePassSeasonRepository } from "@/repositories/in-memory/InMemoryBattlePassSeasonRepository";
import { CreateTaskUseCase } from "@/useCases/Task/createTaskUseCase";
import { createBattlePassSeasonFactory } from "@/tests/@factories/BattlePassSeason";

describe("CreateTaskUseCase", () => {
  let taskRepository: InMemoryTaskRepository;
  let seasonRepository: InMemoryBattlePassSeasonRepository;
  let sut: CreateTaskUseCase;

  beforeEach(async () => {
    taskRepository = new InMemoryTaskRepository();
    seasonRepository = new InMemoryBattlePassSeasonRepository();
    sut = new CreateTaskUseCase(taskRepository, seasonRepository);
  });

  it("should be able to create a task", async () => {
    // Criar uma season de teste primeiro
    const seasonData = createBattlePassSeasonFactory();
    const season = await seasonRepository.create(seasonData);

    const task = await sut.execute({
      name: "Test Task",
      description: "Test Description",
      xpReward: 100,
      taskType: "DAILY",
      season: {
        connect: {
          id: season.id,
        },
      },
    });

    expect(task).toBeDefined();
    expect(task.name).toBe("Test Task");
    expect(task.description).toBe("Test Description");
    expect(task.xpReward).toBe(100);
    expect(task.taskType).toBe("DAILY");
  });
});

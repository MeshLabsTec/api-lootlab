import type { Task, Prisma, TaskType } from "@prisma/client";
import { ITaskRepository } from "../interfaceRepository/ITaskRepository";
import { randomUUID } from "crypto";
import { TaskNotFoundError } from "@/useCases/@erros/Task/TaskNotFoundError";

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const seasonId = data.season.connect?.id;
    if (!seasonId) {
      throw new Error("Season ID is required");
    }

    const task: Task = {
      id: data.id ?? randomUUID(),
      seasonId,
      name: data.name,
      description: data.description,
      xpReward: data.xpReward,
      taskType: data.taskType as TaskType,
      maxCompletions: data.maxCompletions ?? null,
      requirements: (data.requirements ?? null) as Prisma.JsonValue | null,
      isActive: data.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) || null;
  }

  async findMany(seasonId?: string): Promise<Task[]> {
    if (seasonId) {
      return this.tasks.filter((task) => task.seasonId === seasonId);
    }
    return this.tasks;
  }

  async findBySeasonId(seasonId: string): Promise<Task | null> {
    return this.tasks.find((task) => task.seasonId === seasonId) || null;
  }

  async updateById(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new TaskNotFoundError();
    }

    const updatedTask = {
      ...this.tasks[taskIndex],
      ...data,
      updatedAt: new Date(),
    } as Task;

    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  async deleteById(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new TaskNotFoundError();
    }

    this.tasks.splice(taskIndex, 1);
  }
}

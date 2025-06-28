import type { Prisma, Task } from "@prisma/client";

export interface ITaskRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findMany(seasonId?: string): Promise<Task[]>;
  findBySeasonId(seasonId: string): Promise<Task | null>;
  updateById(id: string, data: Prisma.TaskUpdateInput): Promise<Task>;
  deleteById(id: string): Promise<void>;
}

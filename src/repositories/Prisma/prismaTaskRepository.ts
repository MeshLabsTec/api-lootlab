import { prisma } from "@/lib/prisma";
import type { ITaskRepository } from "../interfaceRepository/ITaskRepository";
import type { Prisma } from "@prisma/client";

export class PrismaTaskRepository implements ITaskRepository {
  async create(data: Prisma.TaskCreateInput) {
    const task = await prisma.task.create({
      data,
      include: {
        season: true,
        userTasks: true,
      },
    });
    return task;
  }

  async findById(id: string) {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        season: true,
        userTasks: true,
      },
    });
    return task;
  }

  async findMany(seasonId?: string) {
    const task = await prisma.task.findMany({
      where: seasonId ? { seasonId } : undefined,
      include: {
        season: true,
        userTasks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return task;
  }

  async findBySeasonId(seasonId: string) {
    const tasks = await prisma.task.findMany({
      where: { seasonId },
      include: {
        season: true,
        userTasks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tasks;
  }

  async updateById(id: string, data: Prisma.TaskUpdateInput) {
    const task = await prisma.task.update({
      where: { id },
      data,
      include: {
        season: true,
        userTasks: true,
      },
    });
    return task;
  }

  async deleteById(id: string) {
    await prisma.task.delete({
      where: { id },
    });
  }
}

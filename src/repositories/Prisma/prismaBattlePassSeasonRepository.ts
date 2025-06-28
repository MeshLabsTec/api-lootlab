import type { BattlePassSeason, Prisma } from "@prisma/client";
import { IBattlePassSeasonRepository } from "../interfaceRepository/IBattlePassSeason";
import { prisma } from "@/lib/prisma";

export class PrismaBattlePassSeasonRepository
  implements IBattlePassSeasonRepository
{
  async create(
    data: Prisma.BattlePassSeasonCreateInput,
  ): Promise<BattlePassSeason> {
    return prisma.battlePassSeason.create({ data });
  }

  async findById(id: string): Promise<BattlePassSeason | null> {
    return prisma.battlePassSeason.findUnique({
      where: { id },
    });
  }

  async findMany(): Promise<BattlePassSeason[]> {
    return prisma.battlePassSeason.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findActive(): Promise<BattlePassSeason | null> {
    return prisma.battlePassSeason.findFirst({
      where: { isActive: true },
    });
  }
}

import type { BattlePassSeason, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryBattlePassSeasonRepository {
  private seasons: BattlePassSeason[] = [];

  async create(
    data: Prisma.BattlePassSeasonCreateInput,
  ): Promise<BattlePassSeason> {
    const season: BattlePassSeason = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      isActive: data.isActive ?? false,
      maxTier: data.maxTier ?? 100,
      xpPerTier: data.xpPerTier ?? 1000,
      boostMultiplier: data.boostMultiplier ?? 1.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.seasons.push(season);
    return season;
  }

  async findById(id: string): Promise<BattlePassSeason | null> {
    return this.seasons.find((season) => season.id === id) || null;
  }

  async findMany(): Promise<BattlePassSeason[]> {
    return this.seasons;
  }

  async findActive(): Promise<BattlePassSeason | null> {
    return this.seasons.find((season) => season.isActive) || null;
  }
}

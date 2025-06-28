import type { Prisma, BattlePassSeason } from "@prisma/client";

export interface IBattlePassSeasonRepository {
  create(data: Prisma.BattlePassSeasonCreateInput): Promise<BattlePassSeason>;
  findById(id: string): Promise<BattlePassSeason | null>;
  findMany(): Promise<BattlePassSeason[]>;
  findActive(): Promise<BattlePassSeason | null>;
}

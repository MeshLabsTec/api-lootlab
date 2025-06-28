import type { BattlePassSeason } from "@prisma/client";
import { randomUUID } from "crypto";

export interface CreateBattlePassSeasonParams {
  id?: string;
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
  maxTier?: number;
  xpPerTier?: number;
  boostMultiplier?: number;
}

export function createBattlePassSeasonFactory(
  params: CreateBattlePassSeasonParams = {},
): BattlePassSeason {
  const now = new Date();
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 3); // 3 meses no futuro

  return {
    id: params.id ?? randomUUID(),
    name: params.name ?? "Temporada de Teste",
    description: params.description ?? "Temporada criada para testes",
    startDate: params.startDate ?? now,
    endDate: params.endDate ?? futureDate,
    isActive: params.isActive ?? true,
    maxTier: params.maxTier ?? 100,
    xpPerTier: params.xpPerTier ?? 1000,
    boostMultiplier: params.boostMultiplier ?? 1.0,
    createdAt: now,
    updatedAt: now,
  };
}

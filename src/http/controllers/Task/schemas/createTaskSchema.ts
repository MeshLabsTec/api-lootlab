import { z } from "zod";

export const createTaskSchema = z.object({
  seasonId: z.string().uuid("ID da temporada deve ser um UUID válido"),
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(255, "Nome deve ter no máximo 255 caracteres"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres"),
  xpReward: z
    .number()
    .int()
    .positive("Recompensa de XP deve ser um número positivo"),
  taskType: z.enum(["DAILY", "WEEKLY", "UNIQUE", "PROGRESSIVE"], {
    errorMap: () => ({
      message: "Tipo de tarefa deve ser DAILY, WEEKLY, UNIQUE ou PROGRESSIVE",
    }),
  }),
  maxCompletions: z.number().int().positive().optional(),
  requirements: z.record(z.any()).optional(),
  isActive: z.boolean().optional().default(true),
});

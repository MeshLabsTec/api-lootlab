import { z } from "zod";

export const updateTaskSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(255, "Nome deve ter no máximo 255 caracteres")
    .optional(),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .optional(),
  xpReward: z
    .number()
    .int()
    .positive("Recompensa de XP deve ser um número positivo")
    .optional(),
  taskType: z
    .enum(["DAILY", "WEEKLY", "UNIQUE", "PROGRESSIVE"], {
      errorMap: () => ({
        message: "Tipo de tarefa deve ser DAILY, WEEKLY, UNIQUE ou PROGRESSIVE",
      }),
    })
    .optional(),
  maxCompletions: z.number().int().positive().optional(),
  requirements: z.record(z.any()).optional(),
  isActive: z.boolean().optional(),
});

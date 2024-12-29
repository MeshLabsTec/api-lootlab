import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(255).optional(),
  role: z.enum(["ADMIN", "WRITER", "USER"]).optional(),
});

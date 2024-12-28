import type { FastifySchema } from "fastify";
import { z } from "zod";

export const findByIdUserSwaggerSchema: FastifySchema = {
  description: "Find a user by id",
  tags: ["User"],
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      password: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      role: z.string(),
    }),
    404: z.object({
      error: z.string(),
    }),
    500: z.object({
      error: z.string(),
    }),
  },
};

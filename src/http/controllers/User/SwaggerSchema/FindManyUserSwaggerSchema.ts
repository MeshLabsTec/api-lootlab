import type { FastifySchema } from "fastify";
import { z } from "zod";

export const findManyUserSwaggerSchema: FastifySchema = {
  description: "Find many users",
  tags: ["User"],
  response: {
    200: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        role: z.string(),
      }),
    ),
    500: z.object({
      error: z.string(),
    }),
  },
};

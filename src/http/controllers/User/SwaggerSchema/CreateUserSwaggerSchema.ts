import type { FastifySchema } from "fastify";
import { createUserSchema } from "../schemas/createUserSchema";
import { z } from "zod";

export const createUserSwaggerSchema: FastifySchema = {
  description: "Create a user",
  tags: ["User"],
  body: createUserSchema,
  response: {
    201: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      password: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      role: z.string(),
    }),

    409: z.object({
      error: z.string(),
    }),
    500: z.object({
      error: z.string(),
    }),
  },
};

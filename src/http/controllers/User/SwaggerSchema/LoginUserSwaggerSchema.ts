import type { FastifySchema } from "fastify";
import { z } from "zod";

export const loginUserSwaggerSchema: FastifySchema = {
  description: "Login a user",
  tags: ["User"],
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
  response: {
    200: z.object({
      user: z.object({
        id: z.string(),
        email: z.string(),
      }),
      token: z.string(),
    }),
    401: z.object({
      error: z.string(),
    }),
    500: z.object({
      error: z.string(),
    }),
  },
};

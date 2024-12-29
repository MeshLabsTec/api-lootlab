import type { FastifySchema } from "fastify";
import { z } from "zod";

export const createPostSwaggerSchema: FastifySchema = {
  description: "Create a post",
  tags: ["Post"],
  consumes: ["multipart/form-data"],
  body: z.object({
    postData: z.string(),
    images: z.custom<File>(),
  }),
  response: {
    201: z.object({
      message: z.string(),
    }),
    400: z.object({
      error: z.string(),
      message: z.union([z.string(), z.array(z.any())]),
    }),
    404: z.object({
      message: z.string(),
    }),
    500: z.object({
      error: z.string(),
      message: z.string(),
    }),
  },
};

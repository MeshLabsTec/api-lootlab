import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string(),
  summary: z.string().optional(),
  imageUrl: z.string(),
});

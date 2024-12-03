import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreatePostUseCase } from "@/useCases/@factories/Post/makeCreatePostUseCase";
import { z } from "zod";
import { createPostSchema } from "./schemas/createPostSchema";
import type { ICreatePost } from "@/useCases/interfaces/ICreatePost";

export async function createPostController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const validatedData = createPostSchema.parse(req.body) as ICreatePost;
    const makeCreatePost = makeCreatePostUseCase();
    const post = await makeCreatePost.execute(validatedData);

    return reply.code(201).send(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Erro de validação:", error.errors);
      return reply.code(400).send({ error: error.errors });
    }
    return reply
      .code(500)
      .send({ error: "Erro interno", message: error.message });
  }
}

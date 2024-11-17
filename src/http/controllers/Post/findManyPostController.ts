import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFindManyPostUseCase } from "@/useCases/@factories/Post/makeFindManyPostUseCase";

export async function findManyPostsController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const makeFindManyPosts = makeFindManyPostUseCase();
    const posts = await makeFindManyPosts.execute();

    return reply.status(200).send(posts);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}

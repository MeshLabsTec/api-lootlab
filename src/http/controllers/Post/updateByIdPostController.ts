import type { FastifyReply, FastifyRequest } from "fastify";
import { PostNotFoundError } from "@/useCases/@erros/Post/PostNotFoundError";
import { makeUpdateByIdPostUseCase } from "@/useCases/@factories/Post/makeUpdateByIdPostUseCase";

export async function updateByIdPostController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = req.params as { id: string };
  const data = req.body;

  try {
    const makeFindManyPosts = makeUpdateByIdPostUseCase();
    const post = await makeFindManyPosts.execute(id, data);

    return reply.status(200).send(post);
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}

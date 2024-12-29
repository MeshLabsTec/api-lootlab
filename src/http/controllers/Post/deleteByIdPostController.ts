import type { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteByIdPostUseCase } from "@/useCases/@factories/Post/makeDeleteByIdPostUseCase";
import { PostNotFoundError } from "@/useCases/@erros/Post/PostNotFoundError";

export async function deleteByIdPostController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = req.params as { id: string };

    const makeFindManyPosts = makeDeleteByIdPostUseCase();
    const posts = await makeFindManyPosts.execute(id);

    return reply.status(200).send(posts);
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}

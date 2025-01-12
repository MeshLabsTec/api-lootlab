import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFindByIdPostUseCase } from "@/useCases/@factories/Post/makeFindByIdPostUseCase";
import { PostNotFoundError } from "@/useCases/@erros/Post/PostNotFoundError";

export async function findByIdPostController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = req.params as { id: string };

  try {
    const makeFindManyPosts = makeFindByIdPostUseCase();
    const post = await makeFindManyPosts.execute(id);

    return reply.status(200).send(post);
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ error: error.message });
    }
    console.log(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

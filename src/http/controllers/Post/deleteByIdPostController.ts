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
    await makeFindManyPosts.execute(id);

    return reply.status(200).send({
      message: "Post deletado com sucesso",
    });
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

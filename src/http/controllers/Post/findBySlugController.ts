import type { FastifyReply, FastifyRequest } from "fastify";
import { PostNotFoundError } from "@/useCases/@erros/Post/PostNotFoundError";
import { makeFindBySlugUseCase } from "@/useCases/@factories/Post/makeFindBySlugUseCase";

export async function findBySlugPostController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { slug } = req.params as { slug: string };

  try {
    const makeFindbySlugPosts = makeFindBySlugUseCase();
    const post = await makeFindbySlugPosts.execute(slug);

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

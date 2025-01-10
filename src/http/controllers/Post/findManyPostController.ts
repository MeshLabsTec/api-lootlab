import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFindManyPostUseCase } from "@/useCases/@factories/Post/makeFindManyPostUseCase";

export async function findManyPostsController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { category } = req.query as { category: string };

    const makeFindManyPosts = makeFindManyPostUseCase();
    const posts = await makeFindManyPosts.execute(category);

    return reply.status(200).send(posts);
  } catch (error) {
    console.log(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

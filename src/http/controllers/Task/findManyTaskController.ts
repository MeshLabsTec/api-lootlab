import { makeFindManyTaskUseCase } from "@/useCases/@factories/Task/makeFindManyTaskUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findManyTaskController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    seasonId: z
      .string()
      .uuid("ID da temporada deve ser um UUID válido")
      .optional(),
  });

  try {
    const { seasonId } = querySchema.parse(req.query);

    const makeFindManyTask = makeFindManyTaskUseCase();
    const tasks = await makeFindManyTask.execute(seasonId);

    return reply.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

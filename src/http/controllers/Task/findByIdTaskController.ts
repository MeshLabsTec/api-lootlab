import { makeFindByIdTaskUseCase } from "@/useCases/@factories/Task/makeFindByIdTaskUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { TaskNotFoundError } from "@/useCases/@erros/Task/TaskNotFoundError";
import { z } from "zod";

export async function findByIdTaskController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid("ID deve ser um UUID válido"),
  });

  try {
    const { id } = paramsSchema.parse(req.params);

    const makeFindByIdTask = makeFindByIdTaskUseCase();
    const task = await makeFindByIdTask.execute(id);

    return reply.status(200).send(task);
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      return reply.status(404).send({ error: error.message });
    }
    console.log(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

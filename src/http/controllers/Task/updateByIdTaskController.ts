import { makeUpdateByIdTaskUseCase } from "@/useCases/@factories/Task/makeUpdateByIdTaskUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { updateTaskSchema } from "./schemas/updateTaskSchema";
import { TaskNotFoundError } from "@/useCases/@erros/Task/TaskNotFoundError";
import { TaskAlreadyExistsError } from "@/useCases/@erros/Task/TaskAlreadyExistsError";
import { ZodError, z } from "zod";

export async function updateByIdTaskController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid("ID deve ser um UUID válido"),
  });

  try {
    const { id } = paramsSchema.parse(req.params);
    const updateData = updateTaskSchema.parse(req.body);

    const makeUpdateByIdTask = makeUpdateByIdTaskUseCase();
    const task = await makeUpdateByIdTask.execute(id, updateData);

    return reply.status(200).send(task);
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof TaskAlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    } else if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message });
    }
    console.log(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

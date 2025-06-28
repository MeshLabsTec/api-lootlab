import { makeCreateTaskUseCase } from "@/useCases/@factories/Task/makeCreateTaskUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { createTaskSchema } from "./schemas/createTaskSchema";
import { TaskAlreadyExistsError } from "@/useCases/@erros/Task/TaskAlreadyExistsError";
import { InvalidSeasonError } from "@/useCases/@erros/Task/InvalidSeasonError";
import { ZodError } from "zod";

export async function createTaskController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    seasonId,
    name,
    description,
    xpReward,
    taskType,
    maxCompletions,
    requirements,
    isActive,
  } = createTaskSchema.parse(req.body);

  try {
    const makeCreateTask = makeCreateTaskUseCase();
    const task = await makeCreateTask.execute({
      name,
      description,
      xpReward,
      taskType,
      maxCompletions,
      requirements,
      isActive,
      season: {
        connect: { id: seasonId },
      },
    });

    return reply.status(201).send(task);
  } catch (error) {
    if (error instanceof TaskAlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    } else if (error instanceof InvalidSeasonError) {
      return reply.status(400).send({ error: error.message });
    } else if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message });
    }
    console.log(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

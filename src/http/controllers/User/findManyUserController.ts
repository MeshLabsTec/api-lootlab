import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFindManyUserUseCase } from "@/useCases/@factories/User/makeFindManyUserUseCase";

export async function findManyUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const makeFindMany = makeFindManyUserUseCase();
    const users = await makeFindMany.execute();

    return reply.status(200).send(users);
  } catch (error) {
    console.log(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

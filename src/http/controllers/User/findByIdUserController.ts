import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFindByIdUseCase } from "@/useCases/@factories/User/makeFindByIdUserCase";
import { UserNotFoundError } from "@/useCases/@erros/User/UserNotFoundError";

export async function findByIdUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = req.params as { id: string };

  try {
    const makeFindUser = makeFindByIdUseCase();
    const user = await makeFindUser.execute(id);

    return reply.status(200).send(user);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ error: error.message });
    }
    console.log(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

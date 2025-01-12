import type { FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema } from "./schemas/createUserSchema";
import { ZodError } from "zod";
import { makeUpdateByIdUserUseCase } from "@/useCases/@factories/User/makeUpdateByIdUserUseCase";
import { UserNotFoundError } from "@/useCases/@erros/User/UserNotFoundError";

export async function updateByIdUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = req.params as { id: string };
  const { name, email, password, role } = createUserSchema.parse(req.body);

  try {
    const makeCreateUser = makeUpdateByIdUserUseCase();
    const user = await makeCreateUser.execute(id, {
      name,
      email,
      password,
      role,
    });

    return reply.status(201).send(user);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message });
    }
    console.log(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

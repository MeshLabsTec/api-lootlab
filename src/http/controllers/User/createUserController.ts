import { makeCreateUserUseCase } from "@/useCases/@factories/User/makeCreateUserUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema } from "./schemas/createUserSchema";
import { UserAlreadyExistsError } from "@/useCases/@erros/User/UserAlreadyExistsError";
import { ZodError } from "zod";

export async function createUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = createUserSchema.parse(req.body);

  try {
    const makeCreateUser = makeCreateUserUseCase();
    const user = await makeCreateUser.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send(user);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
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

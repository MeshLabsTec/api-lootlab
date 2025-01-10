import type { FastifyReply, FastifyRequest } from "fastify";
import { makeLoginUserUseCase } from "@/useCases/@factories/User/makeLoginUserUseCase";
import { InvalidCredentialsError } from "@/useCases/@erros/User/InvalidCredentialsError";

export async function loginUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = req.body as { email: string; password: string };

  try {
    const makeCreateUser = makeLoginUserUseCase();
    const user = await makeCreateUser.execute(email, password);

    const token = await reply.jwtSign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return reply.status(200).send({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ error: error.message });
    }
    console.log(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

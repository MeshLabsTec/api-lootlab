import type { FastifyReply, FastifyRequest } from "fastify";

type Role = "ADMIN" | "WRITER" | "USER";

interface ValidateJWTOptions {
  allowedRoles?: Role[];
}

export function validateJWT(options: ValidateJWTOptions = {}) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Usa o jwtVerify do Fastify
      const decoded = await request.jwtVerify<{
        userId: string;
        email: string;
        role: Role;
      }>();

      if (
        options.allowedRoles &&
        !options.allowedRoles.includes(decoded.role)
      ) {
        return reply.status(403).send({
          error: "Forbidden",
          message: `Acesso negado. Papel do usuário não permitido.`,
        });
      }
    } catch (error) {
      return reply.status(401).send({
        error: "Unauthorized",
        message: "Token inválido ou não fornecido",
      });
    }
  };
}

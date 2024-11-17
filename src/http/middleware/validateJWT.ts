import type { FastifyReply, FastifyRequest } from "fastify";

export async function validateJWT(req: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = req.headers.authorization;

    // Verifica se o cabeçalho Authorization está presente
    if (!authHeader) {
      return reply.status(401).send({ message: "Token não encontrado" });
    }

    // Verifica se o formato do cabeçalho está correto
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return reply
        .status(401)
        .send({ message: "Formato do token inválido. Use 'Bearer <token>'" });
    }

    // Verifica e decodifica o token usando o fastify-jwt
    const decoded = await req.jwtVerify();

    // Decodificação bem-sucedida, adiciona os dados do usuário ao request
    req.user = decoded;
  } catch (error) {
    // Responde com um erro apropriado em caso de falha na validação
    if (error.message === "jwt expired") {
      return reply.status(401).send({ message: "Token expirado" });
    }

    return reply
      .status(401)
      .send({ message: "Token inválido ou não autorizado" });
  }
}

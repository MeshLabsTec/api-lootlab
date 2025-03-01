// controllers/DeleteImageController.ts
import { makeDeleteImageUseCase } from "@/useCases/@factories/Carousel/makeDeleleImageUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteImageController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = req.params as { id: string };

    if (!id) {
      return reply.status(400).send({ error: "ID inválido" });
    }

    const deleteImageUseCase = makeDeleteImageUseCase();
    await deleteImageUseCase.execute(id);

    return reply.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    return reply.status(500).send({ error: "Erro interno do servidor" });
  }
}

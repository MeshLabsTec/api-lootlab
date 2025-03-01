import { makeListImagesUseCase } from "@/useCases/@factories/Carousel/makeListImagesUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function listImagesController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  if (req.method !== "GET") {
    return reply.status(405).send({ message: "Method not allowed" });
  }

  try {
    const listImagesUseCase = makeListImagesUseCase();
    const images = await listImagesUseCase.execute();

    return reply.status(200).send(images);
  } catch (error) {
    console.error("Error in listImagesController:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

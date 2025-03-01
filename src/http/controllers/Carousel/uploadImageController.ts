import { FastifyRequest, FastifyReply } from "fastify";
import { makeUploadCarouselImageUseCase } from "@/useCases/@factories/Carousel/makeUploadImageUseCase";
import { uploadImageToR2 } from "@/lib/cloudflare";
import { generateTitle } from "@/utils/generateTitle";
import { AlreadyExistFilename } from "@/useCases/@erros/Carousel/AlreadyExistFileName";

export async function uploadCarouselImageController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const file = await req.file();

    if (!file) {
      console.error("⚠️ Nenhum arquivo foi encontrado no upload!");
      return reply.status(400).send({ error: "Nenhuma imagem foi enviada" });
    }

    const buffer = await file.toBuffer();

    const uniqueKey = `banner-${Date.now()}`;
    const imageUrl = await uploadImageToR2(buffer, uniqueKey);

    const uploadMake = makeUploadCarouselImageUseCase();
    const uploadImage = await uploadMake.execute({
      title: generateTitle(file.filename),
      filename: file.filename,
      path: imageUrl,
    });

    return reply.status(201).send(uploadImage);
  } catch (error) {
    console.error("Erro ao fazer upload de imagem:", error);
    if (error instanceof AlreadyExistFilename) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: "Erro interno do servidor" });
  }
}

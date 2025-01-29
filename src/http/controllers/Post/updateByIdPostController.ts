/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FastifyReply, FastifyRequest } from "fastify";
import { PostNotFoundError } from "@/useCases/@erros/Post/PostNotFoundError";
import { makeUpdateByIdPostUseCase } from "@/useCases/@factories/Post/makeUpdateByIdPostUseCase";
import type { Prisma } from "@prisma/client";

export async function updateByIdPostController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = req.params as { id: string };
    const parts = req.parts();
    let postData: Prisma.PostUncheckedUpdateInput | null = null;
    const imageBuffers: Buffer[] = [];

    for await (const part of parts) {
      if (part.type === "file") {
        const buffer = await part.toBuffer();
        imageBuffers.push(buffer);
      } else if (part.fieldname === "postData") {
        try {
          const parsedData = JSON.parse(part.value as string);
          postData = parsedData;
        } catch (e) {
          return reply.code(400).send({
            error: "InvalidPostData",
            message: "O campo 'postData' não contém um JSON válido.",
          });
        }
      }
    }

    if (!postData) {
      return reply.code(400).send({
        error: "MissingPostData",
        message: "O campo 'postData' é obrigatório.",
      });
    }

    const updatePostUseCase = makeUpdateByIdPostUseCase();
    const updatedPost = await updatePostUseCase.execute(
      id,
      postData,
      imageBuffers,
    );

    return reply.status(200).send(updatedPost);
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    if (error.code === "FST_MULTIPART_INVALID_FORMAT") {
      return reply.status(400).send({
        error: "InvalidMultipartFormat",
        message: "Formato inválido da requisição multipart.",
      });
    }

    console.error(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

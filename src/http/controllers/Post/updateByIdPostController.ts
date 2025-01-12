/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FastifyReply, FastifyRequest } from "fastify";
import { PostNotFoundError } from "@/useCases/@erros/Post/PostNotFoundError";
import { MultipartFile as OriginalMultipartFile } from "@fastify/multipart";
import { makeUpdateByIdPostUseCase } from "@/useCases/@factories/Post/makeUpdateByIdPostUseCase";
import crypto from "crypto";
import { uploadImageToR2 } from "@/lib/cloudflare";
import type { UpdatePostDTO } from "./interfaces/IUpdatePost";

interface MultipartFile extends OriginalMultipartFile {
  buffer: Buffer;
}

export async function updateByIdPostController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = req.params as { id: string };
    const user = req.user;

    const parts = req.parts();
    let postData: UpdatePostDTO | null = null;
    const imageFiles: MultipartFile[] = [];

    for await (const part of parts) {
      if (part.type === "file") {
        const buffer = await part.toBuffer();
        imageFiles.push({
          ...part,
          buffer,
        });
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

    // Só processa e adiciona o campo Image se houver novos arquivos
    if (imageFiles.length > 0) {
      try {
        const uploadedImages = await Promise.all(
          imageFiles.map(async (file) => {
            const random = Math.floor(Math.random() * 1000000);
            const uniqueKey = `post-${random}`;

            const imageUrl = await uploadImageToR2(
              file.buffer,
              uniqueKey,
              file.mimetype,
            );

            if (!imageUrl) {
              throw new Error("Failed to upload image");
            }

            return { url: imageUrl };
          }),
        );

        if (uploadedImages.length > 0) {
          postData.Image = uploadedImages;
        }
      } catch (error) {
        return reply.code(500).send({
          error: "ImageUploadError",
          message: "Erro ao fazer upload das imagens",
          details: error.message,
        });
      }
    } else {
      delete postData.Image;
    }

    const updatePost = makeUpdateByIdPostUseCase();
    const updatedPost = await updatePost.execute(id, postData);

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

    console.log(error);
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
}

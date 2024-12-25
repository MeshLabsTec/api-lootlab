/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FastifyReply, FastifyRequest } from "fastify";
import { PostNotFoundError } from "@/useCases/@erros/Post/PostNotFoundError";
import { MultipartFile as OriginalMultipartFile } from "@fastify/multipart";
import { makeUpdateByIdPostUseCase } from "@/useCases/@factories/Post/makeUpdateByIdPostUseCase";
import crypto from "crypto";
import { uploadImageToR2 } from "@/lib/cloudflare";

interface MultipartFile extends OriginalMultipartFile {
  buffer: Buffer;
}

interface UpdatePostDTO {
  title?: string;
  market_link?: string;
  score?: number;
  investment?: string;
  token?: string;
  network?: string;
  comment_author?: string;
  slug?: string;
  authorId?: string;
  genres?: Array<{
    id: string;
    name: string;
  }>;
  launchInfo?: {
    launchDate?: string;
    marketCap?: number;
    currentSupply?: string;
    totalSupply?: number;
    privateSale?: number;
    publicSale?: number;
  };
  projectFeatures?: Array<{
    id: string;
    title: string;
    isFeature: boolean;
  }>;
  links?: Array<{
    id: string;
    url: string;
  }>;
  partnerships?: Array<{
    id: string;
    type?: string;
    link_url: string;
  }>;
  Image?: Array<{
    url: string;
  }>;
}

export async function updateByIdPostController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = req.params as { id: string };
    console.log("ID recebido:", id);

    const parts = req.parts();
    let postData: UpdatePostDTO | null = null;
    const imageFiles: MultipartFile[] = [];

    for await (const part of parts) {
      console.log("Processando parte:", part.fieldname, part.type);

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
          console.log("Dados do post parseados:", postData);
        } catch (e) {
          console.error("Erro ao parsear postData:", e);
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

    if (imageFiles.length > 0) {
      console.log(imageFiles);
      try {
        const uploadedImages = await Promise.all(
          imageFiles.map(async (file, index) => {
            const randow = Math.floor(Math.random() * 1000000);
            const uniqueKey = `post-${randow}`;

            const imageUrl = await uploadImageToR2(
              file.buffer,
              uniqueKey,
              file.mimetype,
            );

            return { url: imageUrl };
          }),
        );

        postData.Image = uploadedImages;
      } catch (error) {
        console.error("Erro no upload de imagens:", error);
        return reply.code(500).send({
          error: "ImageUploadError",
          message: "Erro ao fazer upload das imagens",
          details: error.message,
        });
      }
    }

    // Remove o campo files antes de enviar para o useCase
    const cleanPostData = postData;

    // Executar o caso de uso
    const updatePost = makeUpdateByIdPostUseCase();
    console.log("Enviando para useCase:", { id, postData: cleanPostData });
    const updatedPost = await updatePost.execute(id, cleanPostData);

    return reply.status(200).send(updatedPost);
  } catch (error) {
    console.error("Erro completo:", error);

    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    if (error.code === "FST_MULTIPART_INVALID_FORMAT") {
      return reply.status(400).send({
        error: "InvalidMultipartFormat",
        message: "Formato inválido da requisição multipart.",
      });
    }

    return reply.status(500).send({
      error: "InternalServerError",
      message: `Erro interno do servidor: ${error.message}`,
    });
  }
}

import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreatePostUseCase } from "@/useCases/@factories/Post/makeCreatePostUseCase";
import { createPostSchema } from "./schemas/createPostSchema";
import { uploadImageToR2 } from "@/lib/cloudflare";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { generateSlug } from "@/utils/generateSlug";

export async function createPostController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const data = await req.file();
    if (!data) {
      return reply.code(400).send({
        error: "FileMissing",
        message: "Nenhum arquivo foi enviado.",
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fields = (data as any).fields || {};
    const buffer = await data.toBuffer();
    let postDataJson;

    try {
      postDataJson = JSON.parse(fields.postData?.value);
    } catch (e) {
      return reply.code(400).send({
        error: "InvalidPostData",
        message: "O campo 'postData' não contém um JSON válido.",
        receivedValue: fields.postData?.value,
        parseError: e.message,
      });
    }

    // Validação dos dados com Zod
    const validatedData = createPostSchema.parse(postDataJson);

    const createPostUseCase = makeCreatePostUseCase();

    // Upload da imagem para o Cloudflare e obtenção da URL
    const uniqueKey = `post-${Date.now()}`;
    const imageUrl = await uploadImageToR2(buffer, uniqueKey);

    // Construção do payload para criação do post
    const postPayload: Prisma.PostUncheckedCreateInput = {
      title: validatedData.title,
      category: validatedData.category,
      marketLink: validatedData.marketLink || null,
      score: validatedData.score || null,
      investment: validatedData.investment || null,
      token: validatedData.token || null,
      network: validatedData.network || null,
      commentAuthor: validatedData.commentAuthor || null,
      authorId: validatedData.authorId || null,
      genres: validatedData.genres?.map((genre) => genre.name) || [],
      links:
        validatedData.links?.map((link) => ({
          url: link.url,
        })) || [],
      projectFeatures:
        validatedData.projectFeatures?.map((feature) => ({
          title: feature.title,
          isFeature: feature.isFeature || false,
        })) || [],
      launchInfo: validatedData.launchInfo
        ? {
            launchDate: validatedData.launchInfo.launchDate || null,
            marketCap: validatedData.launchInfo.marketCap || null,
            currentSupply: validatedData.launchInfo.currentSupply || null,
            totalSupply: validatedData.launchInfo.totalSupply || null,
            privateSale: validatedData.launchInfo.privateSale || null,
            publicSale: validatedData.launchInfo.publicSale || null,
          }
        : null,
      partnerships:
        validatedData.partnerships?.map((partner) => ({
          type: partner.type || null,
          link_url: partner.link_url || null,
        })) || [],
      images: [imageUrl],
      slug: generateSlug(validatedData.title),
    };

    await createPostUseCase.execute(postPayload);

    return reply.status(201).send({ message: "Post criado com sucesso." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: error.errors });
    }
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
      message: error.message,
    });
  }
}

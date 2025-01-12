/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreatePostUseCase } from "@/useCases/@factories/Post/makeCreatePostUseCase";
import { z } from "zod";
import { createPostSchema } from "./schemas/createPostSchema";
import type { ICreatePost } from "@/useCases/interfaces/ICreatePost";
import { UserNotFoundError } from "@/useCases/@erros/User/UserNotFoundError";
import { TitleAlreadyExistError } from "@/useCases/@erros/Post/TitleAlreadyExistError";
import { GenresRequiredError } from "@/useCases/@erros/Post/GenresRequiredError";

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

    const fields = (data as any).fields || {};
    const buffer = await data.toBuffer();
    let jsonDate;
    try {
      jsonDate = JSON.parse(fields.postData.value);
    } catch (e) {
      return reply.code(400).send({
        error: "InvalidPostData",
        message: "O campo 'postData' não contém um JSON válido.",
        receivedValue: fields.postData.value,
        parseError: e.message,
      });
    }

    const validateSchema = createPostSchema.parse(jsonDate);
    const makeCreatePost = makeCreatePostUseCase();

    const postData: ICreatePost = {
      ...validateSchema,
      images: [buffer],
      title: validateSchema.title,
      category: validateSchema.category,
      market_link: validateSchema.market_link,
      score: Number(validateSchema.score),
      authorId: validateSchema.authorId,
      investment: validateSchema.investment,
      token: validateSchema.token,
      network: validateSchema.network,
      comment_author: validateSchema.comment_author,
      links:
        validateSchema.links?.map((link: { url?: string }) => ({
          url: link.url,
        })) || [],
      projectFeatures:
        validateSchema.projectFeatures?.map(
          (feature: { title: string; isFeature?: boolean }) => ({
            title: feature.title,
            isFeature: feature.isFeature || false,
          }),
        ) || [],
      launchInfo: {
        ...validateSchema.launchInfo,
        launchDate: validateSchema.launchInfo.launchDate || "",
        marketCap: Number(validateSchema.launchInfo.marketCap) || 0,
        currentSupply: validateSchema.launchInfo.currentSupply || "",
        totalSupply: Number(validateSchema.launchInfo.totalSupply) || 0,
        privateSale: Number(validateSchema.launchInfo.privateSale) || 0,
        publicSale: Number(validateSchema.launchInfo.publicSale) || 0,
      },
      genres: validateSchema.genres.map(
        (genre: { id: string; name?: string }) => ({
          id: genre.id,
          name: genre.name,
        }),
      ),

      partnerships:
        validateSchema.partnerships?.map(
          (partner: { type?: string; link_url?: string }) => ({
            type: partner.type,
            link_url: partner.link_url,
          }),
        ) || [],
    };
    await makeCreatePost.execute(postData);

    return reply.status(201).send({ message: "Post criado com sucesso." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: error.errors });
    } else if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message });
    } else if (error instanceof TitleAlreadyExistError) {
      return reply.status(400).send({ message: error.message });
    } else if (error instanceof GenresRequiredError) {
      return reply.status(400).send({ message: error.message });
    }
    return reply.status(500).send({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
      message: error.message,
    });
  }
}

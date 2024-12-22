/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { PostNotFoundError } from "../@erros/Post/PostNotFoundError";
import { deleteImageFromR2 } from "@/lib/cloudflare";

interface UpdateLaunchInfoDTO {
  launchDate?: string;
  marketCap?: number;
  currentSupply?: string;
  totalSupply?: number;
  privateSale?: number;
  publicSale?: number;
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
  genres?: string[];
  launchInfo?: UpdateLaunchInfoDTO;
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

export class PostUpdateUseCase {
  constructor(private prisma: PrismaClient) {}

  async execute(id: string, data: UpdatePostDTO) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: {
          Image: true,
        },
      });

      if (!post) {
        throw new PostNotFoundError();
      }

      const {
        genres = undefined,
        launchInfo = undefined,
        projectFeatures = undefined,
        links = undefined,
        partnerships = undefined,
        Image = undefined,
        ...postData
      } = data || {};

      return await this.prisma.$transaction(async (tx) => {
        // 1. Atualiza o post principal
        await tx.post.update({
          where: { id },
          data: {
            ...postData,
            updatedAt: new Date(),
          },
        });

        // 2. Atualiza os gêneros se fornecidos
        if (genres) {
          await tx.post.update({
            where: { id },
            data: {
              genres: {
                set: [], // Remove todos os gêneros existentes
                connect: genres.map((genreId) => ({ id: genreId })),
              },
            },
          });
        }

        // 3. Atualiza LaunchInfo existente
        if (launchInfo) {
          await tx.launchInfo.update({
            where: { postId: id },
            data: launchInfo,
          });
        }

        // 4. Atualiza ProjectFeatures existentes
        if (projectFeatures) {
          for (const feature of projectFeatures) {
            await tx.projectFeatures.update({
              where: { id: feature.id },
              data: {
                title: feature.title,
                isFeature: feature.isFeature,
              },
            });
          }
        }

        // 5. Atualiza Links existentes
        if (links) {
          for (const link of links) {
            await tx.link.update({
              where: { id: link.id },
              data: {
                url: link.url,
              },
            });
          }
        }

        // 6. Atualiza Partnerships existentes
        if (partnerships) {
          for (const partnership of partnerships) {
            await tx.partnership.update({
              where: { id: partnership.id },
              data: {
                type: partnership.type,
                link_url: partnership.link_url,
              },
            });
          }
        }

        // 7. Atualiza Images existentes
        if (Image?.length) {
          try {
            await Promise.all(
              post.Image.map(async (oldImage) => {
                await deleteImageFromR2(oldImage.url);
              }),
            );
          } catch (error) {
            console.error("Erro ao deletar imagens antigas:", error);
          }

          await tx.post.update({
            where: { id },
            data: {
              Image: {
                deleteMany: {},
                create: Image.map((image) => ({
                  url: image.url,
                })),
              },
            },
          });
        }

        // Retorna o post atualizado com todas as relações
        return await tx.post.findUnique({
          where: { id },
          include: {
            genres: true,
            launchInfo: true,
            ProjectFeatures: true,
            links: {
              where: { deletedAt: null },
            },
            partnerships: true,
            Image: true,
          },
        });
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar post: ${error.message}`);
    }
  }
}

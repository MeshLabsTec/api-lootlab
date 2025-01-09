import { deleteImageFromR2 } from "@/lib/cloudflare";
import { PostNotFoundError } from "../@erros/Post/PostNotFoundError";
import type { PrismaClient } from "@prisma/client";
import type { UpdatePostDTO } from "@/http/controllers/Post/interfaces/IUpdatePost";
import { generateSlug } from "@/utils/generateSlug";

export class PostUpdateUseCase {
  constructor(private prisma: PrismaClient) {}

  async execute(id: string, data: UpdatePostDTO) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: {
          Image: true,
          launchInfo: true,
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
        authorId,
        ...postData
      } = data || {};

      return await this.prisma.$transaction(async (tx) => {
        const postUpdateData = {
          ...postData,
          ...(postData.title && { slug: generateSlug(postData.title) }),
          updatedAt: new Date(),
        };

        if (authorId) {
          Object.assign(postUpdateData, {
            author: {
              connect: { id: authorId },
            },
          });
        }

        await tx.post.update({
          where: { id },
          data: postUpdateData,
        });

        if (genres) {
          for (const genre of genres) {
            if (genre.id) {
              await tx.genre.update({
                where: { id: genre.id },
                data: {
                  name: genre.name,
                },
              });
            } else if (genre.name) {
              await tx.genre.create({
                data: {
                  name: genre.name,
                  posts: {
                    connect: { id },
                  },
                },
              });
            }
          }
        }

        if (launchInfo) {
          if (post.launchInfo) {
            await tx.launchInfo.update({
              where: { postId: id },
              data: launchInfo,
            });
          } else {
            await tx.launchInfo.create({
              data: {
                ...launchInfo,
                post: {
                  connect: { id },
                },
              },
            });
          }
        }

        if (projectFeatures) {
          for (const feature of projectFeatures) {
            if (feature.id) {
              await tx.projectFeatures.update({
                where: { id: feature.id },
                data: {
                  title: feature.title,
                  isFeature: feature.isFeature,
                },
              });
            } else {
              await tx.projectFeatures.create({
                data: {
                  title: feature.title,
                  isFeature: feature.isFeature ?? false,
                  post: {
                    connect: { id },
                  },
                },
              });
            }
          }
        }

        if (links) {
          for (const link of links) {
            if (link.id) {
              await tx.link.update({
                where: { id: link.id },
                data: {
                  url: link.url,
                },
              });
            } else if (link.url) {
              await tx.link.create({
                data: {
                  url: link.url,
                  post: {
                    connect: { id },
                  },
                },
              });
            }
          }
        }

        if (partnerships) {
          for (const partnership of partnerships) {
            if (partnership.id) {
              await tx.partnership.update({
                where: { id: partnership.id },
                data: {
                  type: partnership.type,
                  link_url: partnership.link_url,
                },
              });
            } else if (partnership.link_url) {
              await tx.partnership.create({
                data: {
                  type: partnership.type,
                  link_url: partnership.link_url,
                  post: {
                    connect: { id },
                  },
                },
              });
            }
          }
        }

        // Nova lógica para atualização de imagens
        if (Image?.length) {
          try {
            // Deleta imagens antigas apenas se novas imagens forem fornecidas
            if (post.Image.length > 0) {
              await Promise.all(
                post.Image.map(async (oldImage) => {
                  await deleteImageFromR2(oldImage.url);
                }),
              );
            }

            // Atualiza com as novas imagens
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
          } catch (error) {
            throw new Error(`Erro ao atualizar imagens: ${error.message}`);
          }
        }

        // Retorna o post atualizado com todos os relacionamentos
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

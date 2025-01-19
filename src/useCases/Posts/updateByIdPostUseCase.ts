import { deleteImageFromR2 } from "@/lib/cloudflare";
import { PostNotFoundError } from "../@erros/Post/PostNotFoundError";
import { generateSlug } from "@/utils/generateSlug";
import type { Prisma, PrismaClient } from "@prisma/client";

export class PostUpdateUseCase {
  constructor(private prisma: PrismaClient) {}

  async execute(id: string, data: Prisma.PostUncheckedUpdateInput) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
      });

      if (!post) {
        throw new PostNotFoundError();
      }

      return await this.prisma.$transaction(async (tx) => {
        const postUpdateData: Prisma.PostUncheckedUpdateInput = {
          ...data,
          ...(typeof data.title === "string" && {
            slug: generateSlug(data.title),
          }),
          updatedAt: new Date(),
          genres: data.genres || post.genres,
          links: data.links || post.links,
          projectFeatures: data.projectFeatures || post.projectFeatures,
          launchInfo: data.launchInfo || post.launchInfo,
          partnerships: data.partnerships || post.partnerships,
          images: data.images || post.images,
        };

        if (data.authorId && typeof data.authorId === "string") {
          postUpdateData.authorId = data.authorId;
        }

        // Processar imagens: deletar as antigas e adicionar novas
        if (Array.isArray(data.images) && data.images.length > 0) {
          try {
            if (Array.isArray(post.images) && post.images.length > 0) {
              await Promise.all(
                post.images.map(async (oldImageUrl) => {
                  await deleteImageFromR2(oldImageUrl);
                }),
              );
            }
            postUpdateData.images = data.images;
          } catch (error) {
            throw new Error(`Erro ao atualizar imagens: ${error.message}`);
          }
        }

        // Atualizar o post
        const updatedPost = await tx.post.update({
          where: { id },
          data: postUpdateData,
        });

        return updatedPost;
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar post: ${error.message}`);
    }
  }
}

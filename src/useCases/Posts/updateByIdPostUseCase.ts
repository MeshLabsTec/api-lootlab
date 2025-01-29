import type { Prisma } from "@prisma/client";
import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";
import { uploadImageToR2, deleteImageFromR2 } from "@/lib/cloudflare";

export class PostUpdateUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(
    id: string,
    data: Prisma.PostUncheckedUpdateInput,
    imageBuffers: Buffer[] = [],
  ) {
    try {
      const existingPost = await this.postRepository.findById(id);
      if (!existingPost) {
        throw new Error("Post não encontrado");
      }

      if (imageBuffers.length > 0) {
        if (Array.isArray(existingPost.images)) {
          await Promise.all(
            existingPost.images.map(async (oldImage) => {
              await deleteImageFromR2(oldImage);
            }),
          );
        }

        const processedImages = await Promise.all(
          imageBuffers.map(async (buffer, index) => {
            const uniqueKey = `post-${Date.now()}-${index}`;
            return await uploadImageToR2(buffer, uniqueKey);
          }),
        );

        data.images = processedImages as string[];
      }

      // Atualizar o post no repositório
      return await this.postRepository.updateById(id, data);
    } catch (error) {
      throw new Error(`Erro ao atualizar post: ${error.message}`);
    }
  }
}

import type { Prisma } from "@prisma/client";
import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";

export class CreatePostUseCase {
  constructor(private createPostRepository: IPostRepository) {}

  async execute(data: Prisma.PostUncheckedCreateInput) {
    try {
      return await this.createPostRepository.create(data);
    } catch (error) {
      throw new Error(`Erro ao criar post: ${error.message}`);
    }
  }
}

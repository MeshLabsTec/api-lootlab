import type { Prisma } from "@prisma/client";
import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";

export class CreatePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(data: Prisma.PostUncheckedCreateInput) {
    const user = await this.postRepository.create(data);
    return user;
  }
}

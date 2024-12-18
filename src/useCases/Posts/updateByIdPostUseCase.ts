import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";
import { PostNotFoundError } from "../@erros/Post/PostNotFoundError";
import type { Prisma } from "@prisma/client";

export class UpdateByIdPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(id: string, data: Prisma.PostUncheckedUpdateInput) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new PostNotFoundError();
    }

    const updatePost = await this.postRepository.updateById(id, {
      ...data,
    });

    return updatePost;
  }
}

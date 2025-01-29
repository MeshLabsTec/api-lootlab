/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteImageFromR2 } from "@/lib/cloudflare";
import { PostNotFoundError } from "../@erros/Post/PostNotFoundError";
import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";
import type { Post } from "@prisma/client";

export class DeleteByIdUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(id: string) {
    const post: Post = await this.postRepository.findById(id);
    if (!post) {
      throw new PostNotFoundError();
    }

    await deleteImageFromR2(post.images[0]);
    const deleteById = await this.postRepository.deleteById(id);

    return deleteById;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteImageFromR2 } from "@/lib/cloudflare";
import { PostNotFoundError } from "../@erros/Post/PostNotFoundError";
import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";

export class DeleteByIdUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(id: string) {
    const post = await this.postRepository.findById(id);
    console.log(post);
    if (!post) {
      throw new PostNotFoundError();
    }

    await deleteImageFromR2((post as any).Image[0].url);
    const deleteById = await this.postRepository.deleteById(id);

    return deleteById;
  }
}

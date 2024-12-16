import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";
import { PostNotFoundError } from "../@erros/Post/PostNotFoundError";

export class FindBySlugPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(slug: string) {
    const post = await this.postRepository.findBySlug(slug);

    if (!post) {
      throw new PostNotFoundError();
    }

    return post;
  }
}

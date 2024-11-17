import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";
import { PostNotFoundError } from "../@erros/Post/PostNotFoundError";

export class FindByIdPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(id: string) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new PostNotFoundError();
    }

    return post;
  }
}

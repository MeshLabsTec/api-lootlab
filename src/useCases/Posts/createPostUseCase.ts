import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";
import type { ICreatePost } from "../interfaces/ICreatePost";

export class CreatePostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(data: ICreatePost) {
    const createPostInput = {
      title: data.title,
      market_link: data.market_link,
      score: data.score,
      investment: data.investment,
      token: data.token,
      network: data.network,
      comment_author: data.comment_author,
      authorId: data.authorId,
      links: data.links?.length ? { create: data.links } : undefined,
      ProjectFeatures: data.projectFeatures?.length
        ? { create: data.projectFeatures }
        : undefined,
      LaunchInfo: data.launchInfo ? { create: data.launchInfo } : undefined,
      partnerships: data.partnership?.length
        ? { create: data.partnership }
        : undefined,
    };

    const post = await this.postRepository.create(createPostInput);

    return post;
  }
}

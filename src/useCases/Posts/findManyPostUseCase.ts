import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";

export class FindManyPostUseCase {
  constructor(private userRepository: IPostRepository) {}

  async execute(category?: string) {
    const user = await this.userRepository.findMany(category);
    return user;
  }
}

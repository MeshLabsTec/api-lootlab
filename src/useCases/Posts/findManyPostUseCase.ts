import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";

export class FindManyPostUseCase {
  constructor(private userRepository: IPostRepository) {}

  async execute() {
    const user = await this.userRepository.findMany();
    return user;
  }
}

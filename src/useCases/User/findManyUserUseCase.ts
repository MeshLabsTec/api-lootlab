/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IUserRepository } from "@/repositories/interfaceRepository/IUserRepository";

export class FindManyUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    const users = await this.userRepository.findMany();

    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);

    return usersWithoutPassword;
  }
}

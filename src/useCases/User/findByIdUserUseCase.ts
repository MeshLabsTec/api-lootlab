import type { IUserRepository } from "@/repositories/interfaceRepository/IUserRepository";
import { UserNotFoundError } from "../@erros/User/UserNotFoundError";

export class FindByIdUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const userWithoutPassword = { ...user, password: undefined };

    return userWithoutPassword;
  }
}

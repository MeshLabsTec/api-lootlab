import { IUserRepository } from "@/repositories/interfaceRepository/IUserRepository";
import { UserNotFoundError } from "../@erros/User/UserNotFoundError";
import { Prisma } from "@prisma/client";

export class UpdateByIdUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: Prisma.UserUpdateInput) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const userUpdated = await this.userRepository.updateById(id, data);

    return userUpdated;
  }
}

import type { IUserRepository } from "@/repositories/interfaceRepository/IUserRepository";
import type { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserAlreadyExistsError } from "../@erros/User/UserAlreadyExistsError";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: Prisma.UserCreateInput) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }
}

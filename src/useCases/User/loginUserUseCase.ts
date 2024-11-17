import type { IUserRepository } from "@/repositories/interfaceRepository/IUserRepository";
import bcrypt from "bcrypt";
import { InvalidCredentialsError } from "../@erros/User/InvalidCredentialsError";

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}

import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/users/dto/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/InterfaceRepositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { ValidateUser } from "./ValidateUser";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user: ICreateUserDTO): Promise<void> {
    /** throw exception in case of error or user no valid */
    new ValidateUser(user).exec();

    const { email, password } = user;
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError("Usuário já existe");

    await this.usersRepository.create({
      ...user,
      password: await hash(password, 8),
    });
  }
}

export { CreateUserUseCase };

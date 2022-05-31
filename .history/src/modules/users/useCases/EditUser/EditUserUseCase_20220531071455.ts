import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/users/dto/ICreateUserDTO";
import { UsersRepository } from "@modules/users/infra/repositories/UsersRepository";

@injectable()
class EditUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    contact,
    address,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.edit({
      id   
      name,
      contact,
      address,
      email,
      password,
    });
  }
}

export { EditUserUseCase };

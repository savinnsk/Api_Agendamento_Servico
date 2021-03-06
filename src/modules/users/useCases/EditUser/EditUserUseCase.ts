import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IEditUserDTO } from "@modules/users/dto/IEditUserDTO";
import { UsersRepository } from "@modules/users/infra/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class EditUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute({
    id,
    name,
    contact,
    address,
    email,
    password,
  }: IEditUserDTO): Promise<void> {
    // const user = await this.usersRepository.findByEmail(email);
    // if (user.id !== id) throw new AppError("Email não disponível");

    await this.usersRepository.edit({
      id,
      name,
      contact,
      address,
      email,
      password: await hash(password, 8),
    });
  }
}

export { EditUserUseCase };

import { inject, injectable } from "tsyringe";

import { IEditSchedulingDTO } from "@modules/schedulings/dto/IEditSchedulingDTO";
import { SchedulingsRepository } from "@modules/schedulings/infra/repositories/SchedulingsRepository";

@injectable()
class EditSchedulingUseCase {
  constructor(
    @inject("SchedulingsRepository")
    private schedulingRepository: SchedulingsRepository
  ) {}

  async execute(
    { id, type, description, price },
    service_provider_id: IEditSchedulingDTO
  ): Promise<void> {
    await this.schedulingRepository.editScheduling({
      id,
      type,
      description,
      price,
    });
  }
}

export { EditSchedulingUseCase };
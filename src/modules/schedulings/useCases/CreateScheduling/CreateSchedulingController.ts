import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSchedulingUseCase } from "./CreateSchedulingUseCase";

class CreateSchedulingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, description, price, appointments } = request.body;

    const { service_provider } = request;

    const createSchedulingUseCase = container.resolve(CreateSchedulingUseCase);

    await createSchedulingUseCase.execute({
      type,
      description,
      price,
      service_provider: service_provider.id,
      appointments,
    });

    return response.status(201).send();
  }
}

export { CreateSchedulingController };

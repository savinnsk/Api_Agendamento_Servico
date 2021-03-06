import { Response, Request } from "express";
import { container } from "tsyringe";

import { EditSchedulingUseCase } from "./EditSchedulingUseCase";

class EditSchedulingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, description, price } = request.body;

    const { id } = request.params;

    const { service_provider } = request;

    const editSchedulingUseCase = container.resolve(EditSchedulingUseCase);

    const schedulingUpdated = await editSchedulingUseCase.execute(
      {
        id,
        type,
        description,
        price,
      },
      service_provider.id
    );

    return response.status(201).send(schedulingUpdated);
  }
}

export { EditSchedulingController };

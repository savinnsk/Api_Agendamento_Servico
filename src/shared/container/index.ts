import { container } from "tsyringe";

import { AppointmentsRepository } from "@modules/schedulings/infra/repositories/AppointmentsRepository";
import { SchedulingsRepository } from "@modules/schedulings/infra/repositories/SchedulingsRepository";
import { IAppointmentsRepository } from "@modules/schedulings/Interfacerepositories/IAppointmentsRepository";
import { ISchedulingsRepository } from "@modules/schedulings/Interfacerepositories/ISchedulingsRepository";
import { ServiceProvidersRepository } from "@modules/service_providers/infra/repositories/ServiceProvidersRepository";
import { IServiceProvidersRepository } from "@modules/service_providers/repositories/IServiceProvidersRepository";
import { UsersRepository } from "@modules/users/infra/repositories/UsersRepository";
import { IUsersRepository } from "@modules/users/InterfaceRepositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IServiceProvidersRepository>(
  "ServiceProvidersRepository",
  ServiceProvidersRepository
);

container.registerSingleton<ISchedulingsRepository>(
  "SchedulingsRepository",
  SchedulingsRepository
);

container.registerSingleton<IAppointmentsRepository>(
  "AppointmentsRepository",
  AppointmentsRepository
);

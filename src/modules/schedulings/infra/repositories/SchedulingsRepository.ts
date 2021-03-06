import { getRepository, Repository } from "typeorm";

import { ICreateSchedulingDTO } from "@modules/schedulings/dto/ICreateSchedulingDTO";
import { IEditSchedulingDTO } from "@modules/schedulings/dto/IEditSchedulingDTO";
import { ISearchDTO } from "@modules/schedulings/dto/ISearchDTO";
import { ISchedulingsRepository } from "@modules/schedulings/Interfacerepositories/ISchedulingsRepository";

import { Scheduling } from "../entities/Scheduling";

class SchedulingsRepository implements ISchedulingsRepository {
  private repository: Repository<Scheduling>;

  constructor() {
    this.repository = getRepository(Scheduling);
  }

  async findSchedulingsByUser(id: string): Promise<Scheduling[]> {
    const schedulings = await this.repository
      .createQueryBuilder("scheduling")
      .innerJoinAndSelect("scheduling.appointments", "appointment")
      .where("appointment.user_id = :id", {
        id,
      })
      .getMany();

    return schedulings;
  }

  async findSchedulingsByServiceProvider(id: string): Promise<Scheduling[]> {
    const schedulings = await this.repository
      .createQueryBuilder("scheduling")
      .innerJoinAndSelect("scheduling.appointments", "appointments")
      .where("scheduling.service_provider_id = :id", {
        id,
      })
      .getMany();

    return schedulings;
  }

  async create({
    type,
    description,
    price,
    service_provider,
  }: ICreateSchedulingDTO): Promise<Scheduling> {
    const scheduling = this.repository.create({
      type,
      description,
      price,
      service_provider_id: service_provider,
    });

    await this.repository.save(scheduling);

    return scheduling;
  }

  async findById(id: string): Promise<Scheduling> {
    const scheduling = await this.repository.findOne(id);

    return scheduling;
  }

  async listAll(): Promise<Scheduling[]> {
    return this.repository
      .createQueryBuilder("scheduling")
      .leftJoin("scheduling.appointments", "appointments")
      .select([
        "scheduling.type",
        "scheduling.description",
        "scheduling.price",
        "scheduling.available_status",
        "appointments.id",
        "appointments.appointment_time",
        "appointments.available",
      ])
      .getMany();
  }

  async searchByParameters({
    description,
    type,
    page,
    limit,
  }: ISearchDTO): Promise<Scheduling[]> {
    const descriptionSanitized = description
      ? `%${description.toString().toLowerCase()}%`
      : null;

    const typeSanitized = type ? `%${type.toString().toLowerCase()}%` : null;

    return this.repository
      .createQueryBuilder("scheduling")
      .leftJoin("scheduling.appointments", "appointments")
      .select([
        "scheduling.type",
        "scheduling.description",
        "scheduling.price",
        "scheduling.available_status",
        "appointments.id",
        "appointments.appointment_time",
        "appointments.available",
      ])
      .where("LOWER(scheduling.type) like :type", {
        type: `%${typeSanitized}%`,
      })
      .orWhere("LOWER(scheduling.description) like :description", {
        description: `%${descriptionSanitized}%`,
      })
      .orderBy("scheduling.created_at", "ASC")
      .limit(limit)
      .offset((page - 1) * limit)
      .getMany();
  }

  async editScheduling({
    id,
    type,
    description,
    price,
  }: IEditSchedulingDTO): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(Scheduling)
      .set({
        type: `${type}`,
        description: `${description}`,
        price,
      })
      .where("id = :id", {
        id,
      })
      .execute();
  }

  async disableScheduling(
    id: string
    // available_status: boolean
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(Scheduling)
      .set({ available_status: false })
      .where("id = :id", { id })
      .execute();
  }

  async deleteScheduling(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(Scheduling)
      .where("id= :id", { id })
      .execute();
  }
}

export { SchedulingsRepository };

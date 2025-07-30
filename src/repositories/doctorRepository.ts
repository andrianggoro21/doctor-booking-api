import prisma from "../config/database";
import { DoctorType } from "@prisma/client";

export class DoctorRepository {
  async create(name: string, type: DoctorType) {
    return await prisma.doctor.create({
      data: { name, type },
    });
  }

  async findByName(name: string) {
    return await prisma.doctor.findUnique({
      where: { name },
    });
  }

  async findAll(type?: DoctorType) {
    return await prisma.doctor.findMany({
      where: type ? { type } : {},
      include: {
        schedules: true,
        _count: {
          select: { bookings: true },
        },
      },
    });
  }

  async findById(id: number) {
    return await prisma.doctor.findUnique({
      where: { id },
      include: {
        schedules: true,
      },
    });
  }
}

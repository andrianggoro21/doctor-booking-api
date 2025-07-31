import prisma from "../config/database";

export class ScheduleRepository {
  async create(
    doctorId: number,
    day: string,
    openTime: string,
    closeTime: string
  ) {
    return await prisma.schedule.create({
      data: {
        doctorId,
        day,
        openTime,
        closeTime,
      },
      include: {
        doctor: true,
      },
    });
  }

  async findByDoctorAndDay(doctorId: number, day: string) {
    return await prisma.schedule.findUnique({
      where: {
        doctorId_day: { doctorId, day },
      },
    });
  }

  async findByDoctorId(doctorId: number) {
    return await prisma.schedule.findMany({
      where: { doctorId },
      include: {
        doctor: true,
        ScheduleDoctor: true,
      },
    });
  }

  async findAll() {
    return await prisma.schedule.findMany({
      include: {
        doctor: true,
        ScheduleDoctor: true,
      },
    });
  }
}

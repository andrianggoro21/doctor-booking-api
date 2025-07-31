import prisma from "../config/database";

export class DoctorScheduleRepository {
  async createSchedule(scheduleId: number, bookingTime: string[]) {
    const schedule = await prisma.scheduleDoctor.createMany({
      data: bookingTime.map((time) => ({
        scheduleId: scheduleId,
        bookingTime: time,
      })),
    });
    return schedule;
  }

  async findScheduleDoctorBooking(scheduleId: number, bookingTime: string) {
    return await prisma.scheduleDoctor.findMany({
      where: { scheduleId, bookingTime },
    });
  }
}

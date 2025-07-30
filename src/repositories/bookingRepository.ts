import prisma from "../config/database";

export class BookingRepository {
  async create(data: {
    patientName: string;
    phoneNumber: string;
    bookingDate: Date;
    bookingTime: string;
    doctorId: number;
  }) {
    return await prisma.booking.create({
      data,
      include: {
        doctor: true,
      },
    });
  }

  async findConflictingBooking(
    doctorId: number,
    bookingDate: Date,
    bookingTime: string
  ) {
    return await prisma.booking.findFirst({
      where: {
        doctorId,
        bookingDate,
        bookingTime,
      },
    });
  }

  async findAll() {
    return await prisma.booking.findMany({
      include: {
        doctor: true,
      },
      orderBy: {
        bookingDate: "asc",
      },
    });
  }
}

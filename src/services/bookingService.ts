import { BookingRepository } from "../repositories/bookingRepository";
import { ScheduleRepository } from "../repositories/scheduleRepository";
import { DoctorRepository } from "../repositories/doctorRepository";
import { validateCreateBooking } from "../utils/validateBooking";

export class BookingService {
  private bookingRepository: BookingRepository;
  private scheduleRepository: ScheduleRepository;
  private doctorRepository: DoctorRepository;

  constructor() {
    this.bookingRepository = new BookingRepository();
    this.scheduleRepository = new ScheduleRepository();
    this.doctorRepository = new DoctorRepository();
  }

  async createBooking(
    patientName: string,
    phoneNumber: string,
    bookingDate: string,
    bookingTime: string,
    doctorId: number
  ) {
    const validateBookingDateObj = await validateCreateBooking(
      this.doctorRepository,
      this.scheduleRepository,
      this.bookingRepository,
      doctorId,
      bookingDate,
      bookingTime
    );

    return await this.bookingRepository.create({
      patientName,
      phoneNumber,
      bookingDate: validateBookingDateObj,
      bookingTime,
      doctorId,
    });
  }

  async getAllBookings() {
    return await this.bookingRepository.findAll();
  }
}

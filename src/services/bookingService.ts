import { BookingRepository } from "../repositories/bookingRepository";
import { ScheduleRepository } from "../repositories/scheduleRepository";
import { DoctorRepository } from "../repositories/doctorRepository";
import { validateCreateBooking } from "../utils/validateBooking";
import { DoctorScheduleRepository } from "../repositories/doctorScheduleRepository";

export class BookingService {
  private bookingRepository: BookingRepository;
  private scheduleRepository: ScheduleRepository;
  private doctorRepository: DoctorRepository;
  private doctorScheduleRepository: DoctorScheduleRepository;

  constructor() {
    this.bookingRepository = new BookingRepository();
    this.scheduleRepository = new ScheduleRepository();
    this.doctorRepository = new DoctorRepository();
    this.doctorScheduleRepository = new DoctorScheduleRepository();
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
      this.doctorScheduleRepository,
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

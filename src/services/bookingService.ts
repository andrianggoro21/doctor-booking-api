import { BookingRepository } from "../repositories/bookingRepository";
import { ScheduleRepository } from "../repositories/scheduleRepository";
import { DoctorRepository } from "../repositories/doctorRepository";
import {
  getDayName,
  isValidTimeFormat,
  isTimeInRange,
} from "../utils/dateHelper";

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
    const doctor = await this.doctorRepository.findById(doctorId);
    if (!doctor) {
      throw new Error("Dokter tidak ditemukan");
    }

    if (!isValidTimeFormat(bookingTime)) {
      throw new Error("Format waktu tidak valid. Gunakan format HH:MM");
    }

    const bookingDateObj = new Date(bookingDate);
    if (isNaN(bookingDateObj.getTime())) {
      throw new Error("Format tanggal tidak valid");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDateObj < today) {
      throw new Error(
        "Tidak dapat melakukan booking untuk tanggal yang sudah lewat"
      );
    }

    const dayName = getDayName(bookingDateObj);

    const schedule = await this.scheduleRepository.findByDoctorAndDay(
      doctorId,
      dayName
    );
    if (!schedule) {
      throw new Error(
        `Dokter tidak memiliki jadwal praktek pada hari ${dayName}`
      );
    }

    if (!isTimeInRange(bookingTime, schedule.openTime, schedule.closeTime)) {
      throw new Error(
        `Waktu booking harus dalam rentang jam praktek: ${schedule.openTime} - ${schedule.closeTime}`
      );
    }

    const conflictingBooking =
      await this.bookingRepository.findConflictingBooking(
        doctorId,
        bookingDateObj,
        bookingTime
      );
    if (conflictingBooking) {
      throw new Error("Waktu tersebut sudah dibooking oleh pasien lain");
    }

    return await this.bookingRepository.create({
      patientName,
      phoneNumber,
      bookingDate: bookingDateObj,
      bookingTime,
      doctorId,
    });
  }

  async getAllBookings() {
    return await this.bookingRepository.findAll();
  }
}

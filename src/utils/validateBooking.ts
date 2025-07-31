import { BookingRepository } from "../repositories/bookingRepository";
import { DoctorRepository } from "../repositories/doctorRepository";
import { DoctorScheduleRepository } from "../repositories/doctorScheduleRepository";
import { ScheduleRepository } from "../repositories/scheduleRepository";
import { getDayName, isTimeInRange, isValidTimeFormat } from "./dateHelper";

export const validateCreateBooking = async (
  doctorRepository: DoctorRepository,
  scheduleRepository: ScheduleRepository,
  bookingRepository: BookingRepository,
  doctorScheduleRepository: DoctorScheduleRepository,
  doctorId: number,
  bookingDate: string,
  bookingTime: string
) => {
  const doctor = await doctorRepository.findById(doctorId);
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

  const schedule = await scheduleRepository.findByDoctorAndDay(
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

  const scheduleDoctor = await doctorScheduleRepository.findScheduleDoctorBooking(
    schedule.id,
    bookingTime
  )
  

  const conflictingBooking = await bookingRepository.findConflictingBooking(
    doctorId,
    bookingDateObj,
    bookingTime
  );
  if (conflictingBooking) {
    throw new Error("Waktu tersebut sudah dibooking oleh pasien lain");
  }

  return bookingDateObj;
};

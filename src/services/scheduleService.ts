import { ScheduleRepository } from "../repositories/scheduleRepository";
import { DoctorRepository } from "../repositories/doctorRepository";
import { isValidTimeFormat } from "../utils/dateHelper";

export class ScheduleService {
  private scheduleRepository: ScheduleRepository;
  private doctorRepository: DoctorRepository;

  constructor() {
    this.scheduleRepository = new ScheduleRepository();
    this.doctorRepository = new DoctorRepository();
  }

  async createSchedule(
    doctorId: number,
    day: string,
    openTime: string,
    closeTime: string
  ) {
    const doctor = await this.doctorRepository.findById(doctorId);
    if (!doctor) {
      throw new Error("Dokter tidak ditemukan");
    }

    if (!isValidTimeFormat(openTime) || !isValidTimeFormat(closeTime)) {
      throw new Error("Format waktu tidak valid. Gunakan format HH:MM");
    }

    if (openTime >= closeTime) {
      throw new Error("Jam buka harus lebih awal dari jam tutup");
    }

    const existingSchedule = await this.scheduleRepository.findByDoctorAndDay(
      doctorId,
      day.toUpperCase()
    );
    if (existingSchedule) {
      throw new Error("Jadwal untuk hari tersebut sudah ada");
    }

    return await this.scheduleRepository.create(
      doctorId,
      day.toUpperCase(),
      openTime,
      closeTime
    );
  }

  async getDoctorSchedules(doctorId?: number) {
    if (doctorId) {
      const doctor = await this.doctorRepository.findById(doctorId);
      if (!doctor) {
        throw new Error("Dokter tidak ditemukan");
      }
      return await this.scheduleRepository.findByDoctorId(doctorId);
    }

    return await this.scheduleRepository.findAll();
  }
}

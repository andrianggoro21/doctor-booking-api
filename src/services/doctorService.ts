import { DoctorType } from "@prisma/client";
import { DoctorRepository } from "../repositories/doctorRepository";

export class DoctorService {
  private doctorRepository: DoctorRepository;

  constructor() {
    this.doctorRepository = new DoctorRepository();
  }

  async createDoctor(name: string, type: DoctorType) {
    const existingDoctor = await this.doctorRepository.findByName(name);
    if (existingDoctor) {
      throw new Error("Dokter dengan nama tersebut sudah ada");
    }

    return await this.doctorRepository.create(name, type);
  }

  async getDoctors(type?: DoctorType) {
    return await this.doctorRepository.findAll(type);
  }

  async getDoctorById(id: number) {
    const doctor = await this.doctorRepository.findById(id);
    if (!doctor) {
      throw new Error("Dokter tidak ditemukan");
    }
    return doctor;
  }
}

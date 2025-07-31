import { DoctorType } from "@prisma/client";
import { DoctorRepository } from "../repositories/doctorRepository";
import {
  validateCreateDoctor,
  validateGetDoctorId,
} from "../utils/validateDoctor";

export class DoctorService {
  private doctorRepository: DoctorRepository;

  constructor() {
    this.doctorRepository = new DoctorRepository();
  }

  async createDoctor(name: string, type: DoctorType) {
    await validateCreateDoctor(this.doctorRepository, name);
    return await this.doctorRepository.create(name, type);
  }

  async getDoctors(type?: DoctorType) {
    return await this.doctorRepository.findAll(type);
  }

  async getDoctorById(id: number) {
    const doctor = await this.doctorRepository.findById(id);
    await validateGetDoctorId(doctor);
    return doctor;
  }
}

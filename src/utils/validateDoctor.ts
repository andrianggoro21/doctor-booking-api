import { DoctorRepository } from "../repositories/doctorRepository";

export const validateCreateDoctor = async (
  doctorRepository: DoctorRepository,
  name: string
) => {
  const existingDoctor = await doctorRepository.findByName(name);
  if (existingDoctor) {
    throw new Error("Dokter dengan nama tersebut sudah ada");
  }
};

export const validateGetDoctorId = async (doctor: any) => {
  if (!doctor) {
    throw new Error("Dokter tidak ditemukan");
  }
};

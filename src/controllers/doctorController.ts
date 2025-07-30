import { Request, Response } from "express";
import { DoctorService } from "../services/doctorService";
import { sendSuccess, sendError } from "../utils/responseHandler";
import { DoctorType } from "@prisma/client";

export class DoctorController {
  private doctorService: DoctorService;

  constructor() {
    this.doctorService = new DoctorService();
  }

  createDoctor = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, type } = req.body;

      if (!name || !type) {
        return sendError(res, "Nama dan jenis dokter harus diisi", 400);
      }

      if (!Object.values(DoctorType).includes(type)) {
        return sendError(
          res,
          "Jenis dokter tidak valid. Pilihan: GIGI, KECANTIKAN, UMUM",
          400
        );
      }

      const doctor = await this.doctorService.createDoctor(name, type);
      return sendSuccess(res, doctor, "Dokter berhasil dibuat", 201);
    } catch (error: any) {
      return sendError(res, error.message, 400);
    }
  };

  getDoctors = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { type } = req.query;

      let filterType: DoctorType | undefined;
      if (type && Object.values(DoctorType).includes(type as DoctorType)) {
        filterType = type as DoctorType;
      }

      const doctors = await this.doctorService.getDoctors(filterType);
      return sendSuccess(res, doctors, "Data dokter berhasil diambil");
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  };
}

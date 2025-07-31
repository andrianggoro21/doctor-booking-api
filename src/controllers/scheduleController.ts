import { Request, Response } from "express";
import { ScheduleService } from "../services/scheduleService";
import { sendSuccess, sendError } from "../utils/responseHandler";

export class ScheduleController {
  private scheduleService: ScheduleService;

  constructor() {
    this.scheduleService = new ScheduleService();
  }

  createSchedule = async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log("req.body", req.body);
      
      const { doctorId, day, openTime, closeTime, bookingTime } = req.body;

      if (!doctorId || !day || !openTime || !closeTime || !bookingTime) {
        return sendError(res, "Semua field harus diisi", 400);
      }

      const validDays = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ];
      if (!validDays.includes(day.toUpperCase())) {
        return sendError(res, "Hari tidak valid", 400);
      }

      const schedule = await this.scheduleService.createSchedule(
        parseInt(doctorId),
        day,
        openTime,
        closeTime,
        bookingTime
      );

      return sendSuccess(res, schedule, "Jadwal berhasil dibuat", 201);
    } catch (error: any) {
      return sendError(res, error.message, 400);
    }
  };

  getSchedules = async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log("req.query", req.query);
      
      const { doctorId } = req.query;

      const schedules = await this.scheduleService.getDoctorSchedules(
        doctorId ? parseInt(doctorId as string) : undefined
      );

      return sendSuccess(res, schedules, "Data jadwal berhasil diambil");
    } catch (error: any) {
      return sendError(res, error.message, 400);
    }
  };
}

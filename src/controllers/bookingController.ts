import { Request, Response } from "express";
import { BookingService } from "../services/bookingService";
import { sendSuccess, sendError } from "../utils/responseHandler";

export class BookingController {
  private bookingService: BookingService;

  constructor() {
    this.bookingService = new BookingService();
  }

  createBooking = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { patientName, phoneNumber, bookingDate, bookingTime, doctorId } =
        req.body;

      if (
        !patientName ||
        !phoneNumber ||
        !bookingDate ||
        !bookingTime ||
        !doctorId
      ) {
        return sendError(res, "Semua field harus diisi", 400);
      }

      // Validate phone number format (basic validation)
      const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
      if (!phoneRegex.test(phoneNumber)) {
        return sendError(res, "Format nomor telepon tidak valid", 400);
      }

      const booking = await this.bookingService.createBooking(
        patientName,
        phoneNumber,
        bookingDate,
        bookingTime,
        parseInt(doctorId)
      );

      return sendSuccess(res, booking, "Booking berhasil dibuat", 201);
    } catch (error: any) {
      return sendError(res, error.message, 400);
    }
  };

  getBookings = async (req: Request, res: Response): Promise<Response> => {
    try {
      const bookings = await this.bookingService.getAllBookings();
      return sendSuccess(res, bookings, "Data booking berhasil diambil");
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  };
}

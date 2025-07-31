import z from "zod";

export const createBookingSchema = z.object({
    patientName: z.string().min(3).max(50),
    phoneNumber: z.string().min(3).max(50),
    bookingDate: z.string(),
    bookingTime: z.string(),
    doctorId: z.number().min(1),
})
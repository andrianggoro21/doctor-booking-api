import z from "zod";

export const createBookingSchema = z.object({
    patientName: z.string().min(3).max(50),
    phoneNumber: z.string().min(3).max(50),
    bookingDate: z.date(),
    bookingTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    doctorId: z.number().min(1),
})
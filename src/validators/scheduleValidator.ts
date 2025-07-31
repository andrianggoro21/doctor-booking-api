import z from "zod";

export const createScheduleSchema = z.object({
    doctorId: z.number().min(1),
    day: z.string().min(3).max(50),
    openTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    closeTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    bookingTime: z.array(z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)),
});

export const getSchedulesSchema = z.object({
    doctorId: z.number().min(1).optional(),
});
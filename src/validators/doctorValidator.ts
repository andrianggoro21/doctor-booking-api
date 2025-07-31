import z from "zod";

export const createDoctorSchema = z.object({
  name: z.string().min(3).max(50),
  type: z.enum(["GIGI", "KECANTIKAN", "UMUM"]),
});

export const getDoctorSchema = z.object({
  type: z.enum(["GIGI", "KECANTIKAN", "UMUM"]).optional(),
});

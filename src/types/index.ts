import { DoctorType } from "@prisma/client";

export interface CreateDoctorRequest {
  name: string;
  type: DoctorType;
}

export interface CreateScheduleRequest {
  doctorId: number;
  day: string;
  openTime: string;
  closeTime: string;
}

export interface CreateBookingRequest {
  patientName: string;
  phoneNumber: string;
  bookingDate: string;
  bookingTime: string;
  doctorId: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

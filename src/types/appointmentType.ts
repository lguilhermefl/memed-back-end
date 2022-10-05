import { Appointments } from "@prisma/client";

export type TAppointment = Appointments;
export type TCreateAppointment = Omit<TAppointment, "id" | "createdAt">;
export type TAppointmentData = Omit<
  TAppointment,
  "id" | "userId" | "createdAt"
>;
export type TUpdateAppointment = Partial<TAppointment>;

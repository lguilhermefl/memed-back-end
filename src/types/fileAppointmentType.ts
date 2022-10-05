import { AppointmentsFiles } from "@prisma/client";

export type TAppointmentFile = AppointmentsFiles;
export type TCreateAppointmentFile = Omit<
  AppointmentsFiles,
  "id" | "createdAt"
>;

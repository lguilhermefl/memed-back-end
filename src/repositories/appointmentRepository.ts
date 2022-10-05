import { prisma } from "../config/database";
import { TAppointment } from "../types/appointmentType";

export async function insert(appointment: TAppointment) {
  return await prisma.appointments.create({
    data: appointment,
  });
}

export async function findById(id: number) {
  return await prisma.appointments.findUnique({
    where: { id },
  });
}

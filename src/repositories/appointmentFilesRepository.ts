import { prisma } from "../config/database";
import { TCreateAppointmentFile } from "../types/fileAppointmentType";

export async function insert(file: TCreateAppointmentFile) {
  return await prisma.appointmentsFiles.create({
    data: file,
  });
}

export async function remove(id: number) {
  await prisma.appointmentsFiles.delete({
    where: { id },
  });
}

export async function removeByAppointmentId(appointmentId: number) {
  await prisma.appointmentsFiles.deleteMany({
    where: { appointmentId },
  });
}

export async function findByAppointmentId(appointmentId: number) {
  return await prisma.appointmentsFiles.findMany({ where: { appointmentId } });
}

export async function findById(id: number) {
  return await prisma.appointmentsFiles.findUnique({
    where: { id },
  });
}

export async function findByKey(key: string) {
  return await prisma.appointmentsFiles.findUnique({
    where: { key },
  });
}

export async function findByUrl(url: string) {
  return await prisma.appointmentsFiles.findUnique({
    where: { url },
  });
}

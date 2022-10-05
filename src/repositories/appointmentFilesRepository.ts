import { prisma } from "../config/database";
import { TCreateFile } from "../types/fileType";

export async function insert(file: TCreateFile) {
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

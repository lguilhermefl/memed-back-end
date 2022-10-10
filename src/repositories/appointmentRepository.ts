import { prisma } from "../config/database";
import {
  TCreateAppointment,
  TUpdateAppointment,
} from "../types/appointmentType";

export async function insert(appointment: TCreateAppointment) {
  return await prisma.appointments.create({
    data: appointment,
  });
}

export async function findById(id: number) {
  return await prisma.appointments.findUnique({
    where: { id },
  });
}

export async function remove(id: number) {
  await prisma.appointments.delete({
    where: { id },
  });
}

export async function findByIdAndUserIdWithFiles(id: number, userId: number) {
  return await prisma.$queryRaw`
    select a.id, a.title, a.notes, a.date, a."userId", array(
      select coalesce(
        json_build_object('id', af.id, 'name', af.name, 'size', af.size, 'url', af.url)
      , '[] '
      ) from "appointmentsFiles" af
      where af."appointmentId"=a.id
    ) as files
    from appointments a
    where a.id=${id} and a."userId"=${userId}
    order by a.date
  `;
}

export async function findAllByUserIdWithFiles(userId: number) {
  return await prisma.$queryRaw`
    select a.id, a.title, a.notes, a.date, a."userId", array(
      select coalesce(
        json_build_object('id', af.id, 'name', af.name, 'size', af.size, 'url', af.url)
      , '[] '
      ) from "appointmentsFiles" af
      where af."appointmentId"=a.id
    ) as files
    from appointments a
    where a."userId"=${userId}
    order by a.date
  `;
}

export async function update(appointmentData: TUpdateAppointment, id: number) {
  return await prisma.appointments.update({
    where: { id },
    data: appointmentData,
  });
}

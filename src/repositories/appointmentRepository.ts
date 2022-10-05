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

export async function findAllByUserIdWithFiles(userId: number) {
  return await prisma.$queryRaw`
    select a.id, a.title, a.notes, a.date, array(
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

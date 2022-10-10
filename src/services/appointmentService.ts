import {
  TAppointment,
  TCreateAppointment,
  TUpdateAppointment,
} from "../types/appointmentType";
import { TAppointmentFile } from "../types/fileAppointmentType";
import * as appointmentFilesRepository from "../repositories/appointmentFilesRepository";
import * as appointmentRepository from "../repositories/appointmentRepository";
import { notFoundError, unauthorizedError } from "../utils/errorUtils";
import removeMultipleFilesS3 from "../utils/removeMultipleFiles";

export async function insert(appointment: TCreateAppointment) {
  return await appointmentRepository.insert(appointment);
}

export async function getByIdAndUserIdWithFiles(id: number, userId: number) {
  const appointment: any =
    await appointmentRepository.findByIdAndUserIdWithFiles(id, userId);

  if (appointment.length === 0) throw notFoundError("Appointment id not found");
  if (userId !== appointment[0]!.userId)
    throw unauthorizedError("Only the owner can get the appointment");

  return appointment[0];
}

export async function getAllByUserIdWithFiles(userId: number) {
  const appointments: any =
    await appointmentRepository.findAllByUserIdWithFiles(userId);

  if (appointments.length !== 0 && userId !== appointments[0]!.userId)
    throw unauthorizedError("Only the owner can get the appointments");

  return appointments;
}

export async function remove(id: number, userId: number) {
  const appointment: TAppointment | null = await appointmentRepository.findById(
    id
  );

  if (!appointment) throw notFoundError("Appointment id not found");
  if (userId !== appointment!.userId)
    throw unauthorizedError("Only the appointment owner can delete it");

  const files: TAppointmentFile[] =
    await appointmentFilesRepository.findByAppointmentId(id);

  if (files.length > 0) {
    await removeMultipleFilesS3(files);
    await appointmentFilesRepository.removeByAppointmentId(id);
  }

  await appointmentRepository.remove(id);
}

export async function update(
  appointmentData: TUpdateAppointment,
  id: number,
  userId: number
) {
  const appointment: TAppointment | null = await appointmentRepository.findById(
    id
  );

  if (!appointment) throw notFoundError("Appointment id not found");
  if (userId !== appointment!.userId)
    throw unauthorizedError("Only the appointment owner can update it");

  return await appointmentRepository.update(appointmentData, id);
}

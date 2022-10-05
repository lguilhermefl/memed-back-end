import { TCreateAppointment } from "../types/appointmentType";
import * as appointmentRepository from "../repositories/appointmentRepository";

export async function insert(appointment: TCreateAppointment) {
  return await appointmentRepository.insert(appointment);
}

export async function getAllByUserIdWithFiles(userId: number) {
  return await appointmentRepository.findAllByUserIdWithFiles(userId);
}

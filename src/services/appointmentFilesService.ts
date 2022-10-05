import s3Config from "../config/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import {
  TAppointmentFile,
  TCreateAppointmentFile,
} from "../types/fileAppointmentType";
import { TAppointment } from "../types/appointmentType";
import * as appointmentRepository from "../repositories/appointmentRepository";
import * as appointmentFilesRepository from "../repositories/appointmentFilesRepository";
import {
  notFoundError,
  conflictError,
  unauthorizedError,
  badRequestError,
} from "../utils/errorUtils";
import removeMultipleFilesS3 from "../utils/removeMultipleFiles";

export async function insert(file: TAppointmentFile, userId: number) {
  const test: TAppointment | null = await appointmentRepository.findById(
    file.appointmentId
  );

  if (!test) throw notFoundError("Appointment id not found");
  if (userId !== test!.userId)
    throw unauthorizedError("Only the appointment owner can upload files");

  const fileWithKey: TAppointmentFile | null =
    await appointmentFilesRepository.findByKey(file.key);

  if (fileWithKey) throw conflictError("File key already exists");

  const fileWithUrl: TAppointmentFile | null =
    await appointmentFilesRepository.findByUrl(file.url);

  if (fileWithUrl) throw conflictError("File url already exists");

  const appointmentFiles: TAppointmentFile[] =
    await appointmentFilesRepository.findByAppointmentId(file.appointmentId);

  if (!(appointmentFiles.length < 10))
    throw badRequestError("You already have 10 files uploaded");

  return await appointmentFilesRepository.insert(file);
}

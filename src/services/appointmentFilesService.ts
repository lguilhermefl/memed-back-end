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

export async function insert(file: TCreateAppointmentFile, userId: number) {
  const appointment: TAppointment | null = await appointmentRepository.findById(
    file.appointmentId
  );

  if (!appointment) throw notFoundError("Appointment id not found");
  if (userId !== appointment!.userId)
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

export async function remove(id: number, userId: number) {
  const file: TAppointmentFile | null =
    await appointmentFilesRepository.findById(id);

  if (!file) throw notFoundError("File not found");

  const appointment: TAppointment | null = await appointmentRepository.findById(
    file!.appointmentId
  );

  if (!appointment) throw notFoundError("Appointment id not found");
  if (userId !== appointment.userId)
    throw unauthorizedError("Only the appointment owner can remove files");

  const bucketParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.key,
  };

  await s3Config.send(new DeleteObjectCommand(bucketParams));
  await appointmentFilesRepository.remove(id);
}

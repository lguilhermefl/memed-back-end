import { Request, Response } from "express";
import * as appointmentFilesService from "../services/appointmentFilesService";
import {
  TAppointmentFile,
  TCreateAppointmentFile,
} from "../types/fileAppointmentType";
import { AppError } from "../utils/errorUtils";

export async function insert(req: Request, res: Response) {
  const { appointmentId } = req.params;
  const { userId }: any = res.locals.tokenPayload;
  const {
    originalname: name,
    size,
    key,
    location: url,
  } = req.file as Express.Multer.File & { key: string; location: string };
  const file: TCreateAppointmentFile = {
    name,
    key,
    size,
    url,
    appointmentId: +appointmentId,
  };

  const insertedFile: TAppointmentFile | AppError =
    await appointmentFilesService.insert(file, +userId);

  res.status(201).send(insertedFile);
}

export async function remove(req: Request, res: Response) {
  const { id }: any = req.params;
  const { userId }: any = res.locals.tokenPayload;

  await appointmentFilesService.remove(+id, +userId);

  res.sendStatus(200);
}

export async function removeAll(req: Request, res: Response) {
  const { appointmentId }: any = req.params;
  const { userId }: any = res.locals.tokenPayload;

  await appointmentFilesService.removeAllByAppointmentId(
    +appointmentId,
    +userId
  );

  res.sendStatus(200);
}

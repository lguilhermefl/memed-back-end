import { IdentityStore } from "aws-sdk";
import { Request, Response } from "express";
import * as appointmentService from "../services/appointmentService";
import {
  TAppointment,
  TAppointmentData,
  TCreateAppointment,
} from "../types/appointmentType";

export async function insert(req: Request, res: Response) {
  const appointmentData: TAppointmentData = req.body;
  const { userId }: any = res.locals.tokenPayload;

  const appointment: TCreateAppointment = {
    ...appointmentData,
    userId: +userId,
  };

  const insertedAppointment: TAppointment = await appointmentService.insert(
    appointment
  );

  res.status(201).send(insertedAppointment);
}

export async function getAll(req: Request, res: Response) {
  const { userId }: any = res.locals.tokenPayload;

  const appointments: any = await appointmentService.getAllByUserIdWithFiles(
    +userId
  );

  res.status(200).send(appointments);
}

export async function remove(req: Request, res: Response) {
  const { appointmentId }: any = req.params;
  const { userId }: any = res.locals.tokenPayload;

  await appointmentService.remove(+appointmentId, +userId);

  res.sendStatus(200);
}

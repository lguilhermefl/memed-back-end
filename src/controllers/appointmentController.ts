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

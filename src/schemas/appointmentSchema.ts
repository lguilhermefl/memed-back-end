import joi from "joi";

export const appointmentSchema = joi.object({
  title: joi.string().required(),
  date: joi.date().optional(),
  notes: joi.string().optional(),
});

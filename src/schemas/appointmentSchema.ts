import joi from "joi";

export const appointmentSchema = joi.object({
  title: joi.string().required(),
  date: joi
    .string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, { name: "date" })
    .optional(),
  notes: joi.string().allow("").optional(),
});

export const updateAppointmentSchema = joi.object({
  title: joi.string().optional(),
  date: joi
    .string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, { name: "date" })
    .optional(),
  notes: joi.string().allow("").optional(),
});

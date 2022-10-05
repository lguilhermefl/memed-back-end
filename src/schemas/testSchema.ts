import joi from "joi";

export const testSchema = joi.object({
  title: joi.string().required(),
  date: joi.date().optional(),
  notes: joi.string().optional(),
});

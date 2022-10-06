import joi from "joi";

export const testSchema = joi.object({
  title: joi.string().required(),
  date: joi
    .string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, { name: "date" })
    .optional(),
  notes: joi.string().optional(),
});

export const updateTestSchema = joi.object({
  title: joi.string().optional(),
  date: joi
    .string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, { name: "date" })
    .optional(),
  notes: joi.string().optional(),
});

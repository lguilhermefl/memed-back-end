import joi from "joi";

export const signInSchema = joi.object({
  email: joi.string().max(40).email().required(),
  password: joi.string().min(6).required(),
});

export const signUpSchema = joi
  .object({
    email: joi.string().max(40).email().required(),
    password: joi.string().min(6).max(40).required(),
    repeat_password: joi.ref("password"),
  })
  .with("password", "repeat_password");

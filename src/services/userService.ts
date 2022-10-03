import { TUser, TCreateUser } from "../types/userType";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils";

export async function insert(user: TCreateUser) {
  const { email }: TCreateUser = user;

  const userExist: TUser | null = await userRepository.findByEmail(email);

  if (userExist) throw conflictError("Email already registered");

  const SALT: number = 10;
  const hashPassword: string = bcrypt.hashSync(user.password, SALT);

  const { password, ...insertedUser } = await userRepository.insert({
    email,
    password: hashPassword,
  });

  return insertedUser;
}

import { TUser, TCreateUser, TSignInUser } from "../types/userType";
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

export async function signIn(user: TSignInUser) {
  const { email, password }: TSignInUser = user;
  const userData: TUser | null = await userRepository.findByEmail(email);

  if (!userData) throw notFoundError("User not found");
  if (!bcrypt.compareSync(password, userData!.password))
    throw unauthorizedError("Incorrect password");

  const token: string = generateJwtToken(userData!.id);

  return token;
}

function generateJwtToken(userId: number): string {
  const SECRET: string = process.env.TOKEN_SECRET_KEY ?? "";
  const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

  const payload = {
    id: 1,
    userId,
    nivel: 1,
  };

  const jwtConfig = {
    expiresIn: EXPIRES_IN,
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
}

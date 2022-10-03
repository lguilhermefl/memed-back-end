import { Request, Response } from "express";
import * as userService from "../services/userService";
import { TCreateUser } from "../types/userType";

export async function insert(req: Request, res: Response) {
  const user: TCreateUser = req.body;

  const insertedUser = await userService.insert(user);

  res.status(201).send(insertedUser);
}

export async function signIn(req: Request, res: Response) {
  const user: TCreateUser = req.body;

  const token: string = await userService.signIn(user);

  res.status(200).send({ token });
}

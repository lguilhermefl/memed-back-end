import { NextFunction, Request, Response } from "express";
import { unauthorizedError } from "../utils/errorUtils";
import jwt from "jsonwebtoken";

export default function validateJWT() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorization: string | undefined = req.headers["authorization"];

    if (!authorization)
      throw unauthorizedError("Authorization header is required");

    const isAuthorizationCorrectlyFormated: boolean =
      authorization!.includes("Bearer ");

    if (!isAuthorizationCorrectlyFormated)
      throw unauthorizedError("Token is not in the right format");

    const token: string = authorization!.trim().replace("Bearer ", "");

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? "";

    try {
      const decodedPayload = jwt.verify(token, SECRET);

      res.locals.tokenPayload = decodedPayload;
      next();
    } catch (error) {
      return res.status(401).send("Token is not valid");
    }
  };
}

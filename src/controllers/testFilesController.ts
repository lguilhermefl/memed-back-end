import { Request, Response } from "express";
import * as testFilesService from "../services/testFilesService";
import { TCreateTest } from "../types/fileType";

export async function insert(req: Request, res: Response) {
  const {
    originalname: name,
    size,
    key,
    location: url,
  } = req.file as Express.Multer.File & { key: string; location: string };
  const { testId } = req.params;

  const file: TCreateTest = {
    name,
    key,
    size,
    url,
    testId: +testId,
  };

  const insertedFile = await testFilesService.insert(file);

  res.status(201).send(insertedFile);
}

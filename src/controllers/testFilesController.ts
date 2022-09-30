import { Request, Response } from "express";
import * as testFilesService from "../services/testFilesService";
import { TTestFile, TCreateTestFile } from "../types/fileTestType";
import { AppError } from "../utils/errorUtils";

export async function insert(req: Request, res: Response) {
  const {
    originalname: name,
    size,
    key,
    location: url,
  } = req.file as Express.Multer.File & { key: string; location: string };
  const { testId } = req.params;

  const file: TCreateTestFile = {
    name,
    key,
    size,
    url,
    testId: +testId,
  };

  const insertedFile: TTestFile | AppError = await testFilesService.insert(
    file
  );

  res.status(201).send(insertedFile);
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;

  await testFilesService.remove(+id);

  res.sendStatus(200);
}

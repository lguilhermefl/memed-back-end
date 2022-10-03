import { Request, Response } from "express";
import * as testFilesService from "../services/testFilesService";
import { TTestFile, TCreateTestFile } from "../types/fileTestType";
import { AppError } from "../utils/errorUtils";

export async function insert(req: Request, res: Response) {
  const { testId } = req.params;
  const { userId }: any = res.locals.tokenPayload;
  const {
    originalname: name,
    size,
    key,
    location: url,
  } = req.file as Express.Multer.File & { key: string; location: string };
  const file: TCreateTestFile = {
    name,
    key,
    size,
    url,
    testId: +testId,
  };

  const insertedFile: TTestFile | AppError = await testFilesService.insert(
    file,
    +userId
  );

  res.status(201).send(insertedFile);
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  const { userId }: any = res.locals.tokenPayload;

  await testFilesService.remove(+id, +userId);

  res.sendStatus(200);
}

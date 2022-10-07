import { Request, Response } from "express";
import * as testFilesService from "../services/testFilesService";
import { TTestFile, TCreateTestFile } from "../types/fileTestType";
import createFileObject from "../utils/createFileObject";
import { AppError } from "../utils/errorUtils";

export async function insert(req: Request, res: Response) {
  const { testId } = req.params;
  const { userId }: any = res.locals.tokenPayload;

  const uploadedFile = req.file as Express.Multer.File & {
    key: string;
    location: string;
  };
  const fileObject: any = createFileObject(uploadedFile);
  const file: TCreateTestFile = {
    ...fileObject,
    testId: +testId,
  };

  const insertedFile: TTestFile | AppError = await testFilesService.insert(
    file,
    +userId
  );

  res.status(201).send(insertedFile);
}

export async function remove(req: Request, res: Response) {
  const { id }: any = req.params;
  const { userId }: any = res.locals.tokenPayload;

  await testFilesService.remove(+id, +userId);

  res.sendStatus(200);
}

export async function removeAll(req: Request, res: Response) {
  const { testId }: any = req.params;
  const { userId }: any = res.locals.tokenPayload;

  await testFilesService.removeAllByTestId(+testId, +userId);

  res.sendStatus(200);
}

import { Request, Response } from "express";
import * as testService from "../services/testService";
import { TTestData, TTest, TCreateTest } from "../types/testType";

export async function insert(req: Request, res: Response) {
  const testData: TTestData = req.body;
  const { userId }: any = res.locals.tokenPayload;

  const test: TCreateTest = {
    ...testData,
    userId: +userId,
  };

  const insertedTest: TTest = await testService.insert(test);

  res.status(201).send(insertedTest);
}

export async function getAll(req: Request, res: Response) {
  const { userId }: any = res.locals.tokenPayload;

  const tests: any = await testService.getAllByUserIdWithFiles(+userId);

  res.status(200).send(tests);
}

export async function remove(req: Request, res: Response) {
  const { testId }: any = req.params;
  const { userId }: any = res.locals.tokenPayload;

  await testService.remove(+testId, +userId);

  res.status(200);
}

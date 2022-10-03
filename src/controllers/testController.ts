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

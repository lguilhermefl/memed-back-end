import s3Config from "../config/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { TTestFile, TCreateTestFile } from "../types/fileTestType";
import { TTest } from "../types/testType";
import * as testRepository from "../repositories/testRepository";
import * as testFilesRepository from "../repositories/testFilesRepository";
import {
  notFoundError,
  conflictError,
  unauthorizedError,
  badRequestError,
} from "../utils/errorUtils";
import removeMultipleFilesS3 from "../utils/removeMultipleFiles";

export async function insert(file: TCreateTestFile, userId: number) {
  const test: TTest | null = await testRepository.findById(file.testId);

  if (!test) throw notFoundError("Test id not found");
  if (userId !== test!.userId)
    throw unauthorizedError("Only the test owner can upload files");

  const fileWithKey: TTestFile | null = await testFilesRepository.findByKey(
    file.key
  );

  if (fileWithKey) throw conflictError("File key already exists");

  const fileWithUrl: TTestFile | null = await testFilesRepository.findByUrl(
    file.url
  );

  if (fileWithUrl) throw conflictError("File url already exists");

  const testFiles: TTestFile[] = await testFilesRepository.findByTestId(
    file.testId
  );

  if (testFiles.length >= 5)
    throw badRequestError("You already have 5 files uploaded");

  return await testFilesRepository.insert(file);
}

export async function remove(id: number, userId: number) {
  const file: TTestFile | null = await testFilesRepository.findById(id);

  if (!file) throw notFoundError("File not found");

  const test: TTest | null = await testRepository.findById(file!.testId);

  if (!test) throw notFoundError("Test id not found");
  if (userId !== test.userId)
    throw unauthorizedError("Only the test owner can remove files");

  const bucketParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.key,
  };

  await s3Config.send(new DeleteObjectCommand(bucketParams));
  await testFilesRepository.remove(id);
}

export async function removeAllByTestId(testId: number, userId: number) {
  const files: TTestFile[] | null = await testFilesRepository.findByTestId(
    testId
  );

  if (!files) throw notFoundError("Test doesn't have any files uploaded");

  const test: TTest | null = await testRepository.findById(files[0]!.testId);

  if (!test) throw notFoundError("Test id not found");
  if (userId !== test.userId)
    throw unauthorizedError("Only the test owner can remove files");

  await removeMultipleFilesS3(files);
  await testFilesRepository.removeByTestId(testId);
}

export async function getAllByTestId(testId: number, userId: number) {
  const files: TTestFile[] | null = await testFilesRepository.findByTestId(
    testId
  );

  if (!files) throw notFoundError("Test doesn't have any files uploaded");

  const test: TTest | null = await testRepository.findById(files[0]!.testId);

  if (!test) throw notFoundError("Test id not found");
  if (userId !== test.userId)
    throw unauthorizedError("Only the test owner can get files");

  return files;
}

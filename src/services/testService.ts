import { TCreateTest, TTest } from "../types/testType";
import * as testRepository from "../repositories/testRepository";
import * as testFilesRepository from "../repositories/testFilesRepository";
import { notFoundError, unauthorizedError } from "../utils/errorUtils";
import { TTestFile } from "../types/fileTestType";
import removeMultipleFilesS3 from "../utils/removeMultipleFiles";

export async function insert(test: TCreateTest) {
  return await testRepository.insert(test);
}

export async function getAllByUserIdWithFiles(userId: number) {
  return await testRepository.findAllByUserIdWithFiles(userId);
}

export async function remove(id: number, userId: number) {
  const test: TTest | null = await testRepository.findById(id);

  if (!test) throw notFoundError("Test id not found");
  if (userId !== test!.userId)
    throw unauthorizedError("Only the test owner can delete it");

  const files: TTestFile[] = await testFilesRepository.findByTestId(id);

  if (files.length > 0) {
    await removeMultipleFilesS3(files);
    await testFilesRepository.removeByTestId(id);
  }

  await testRepository.remove(id);
}

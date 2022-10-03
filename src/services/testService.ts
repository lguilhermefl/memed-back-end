import { TCreateTest } from "../types/testType";
import * as testRepository from "../repositories/testRepository";

export async function insert(test: TCreateTest) {
  return await testRepository.insert(test);
}

export async function getAllByUserIdWithFiles(userId: number) {
  return await testRepository.findAllByUserIdWithFiles(userId);
}
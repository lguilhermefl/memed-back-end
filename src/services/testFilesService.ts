import s3Config from "../config/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { TCreateTest } from "../types/fileType";
import * as testFilesRepository from "../repositories/testFilesRepository";
import { notFoundError, conflictError } from "../utils/errorUtils";

export async function insert(file: TCreateTest) {
  const fileWithKey = await testFilesRepository.findByKey(file.key);
  const fileWithUrl = await testFilesRepository.findByUrl(file.url);

  if (fileWithKey) return conflictError("File key already exists");
  if (fileWithUrl) return conflictError("File url already exists");

  return await testFilesRepository.insert(file);
}

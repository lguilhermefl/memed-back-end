import s3Config from "../config/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { TCreateTestFile } from "../types/fileTestType";
import * as testFilesRepository from "../repositories/testFilesRepository";
import { notFoundError, conflictError } from "../utils/errorUtils";

export async function insert(file: TCreateTestFile) {
  const fileWithKey = await testFilesRepository.findByKey(file.key);
  const fileWithUrl = await testFilesRepository.findByUrl(file.url);

  if (fileWithKey) return conflictError("File key already exists");
  if (fileWithUrl) return conflictError("File url already exists");

  return await testFilesRepository.insert(file);
}

export async function remove(id: number) {
  const file = await testFilesRepository.findById(id);

  if (!file) return notFoundError("File not found");

  const bucketParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.key,
  };

  await s3Config.send(new DeleteObjectCommand(bucketParams));
  await testFilesRepository.remove(id);
}

import { prisma } from "../config/database";
import { TCreateTest } from "../types/fileType";

export async function insert(file: TCreateTest) {
  return await prisma.testsFiles.create({
    data: file,
  });
}

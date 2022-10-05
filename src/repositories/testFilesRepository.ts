import { prisma } from "../config/database";
import { TCreateFile } from "../types/fileType";

export async function insert(file: TCreateFile) {
  return await prisma.testsFiles.create({
    data: file,
  });
}

export async function remove(id: number) {
  await prisma.testsFiles.delete({
    where: { id },
  });
}

export async function removeByTestId(testId: number) {
  await prisma.testsFiles.deleteMany({
    where: { testId },
  });
}

export async function findByTestId(testId: number) {
  return await prisma.testsFiles.findMany({ where: { testId } });
}

export async function findById(id: number) {
  return await prisma.testsFiles.findUnique({
    where: { id },
  });
}

export async function findByKey(key: string) {
  return await prisma.testsFiles.findUnique({
    where: { key },
  });
}

export async function findByUrl(url: string) {
  return await prisma.testsFiles.findUnique({
    where: { url },
  });
}

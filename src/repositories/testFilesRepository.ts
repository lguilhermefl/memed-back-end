import { prisma } from "../config/database";
import { TCreateTest } from "../types/fileType";

export async function insert(file: TCreateTest) {
  return await prisma.testsFiles.create({
    data: file,
  });
}

export async function remove(id: number) {
  await prisma.testsFiles.delete({
    where: { id },
  });
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

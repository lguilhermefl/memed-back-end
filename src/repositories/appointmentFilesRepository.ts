import { prisma } from "../config/database";
import { TCreateFile } from "../types/fileType";

export async function insert(file: TCreateFile) {
  return await prisma.appointmentsFiles.create({
    data: file,
  });
}

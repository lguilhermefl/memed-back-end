import { prisma } from "../config/database";
import { TCreateTest } from "../types/testType";

export async function insert(test: TCreateTest) {
  return await prisma.tests.create({
    data: test,
  });
}

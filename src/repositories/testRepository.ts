import { prisma } from "../config/database";
import { TCreateTest } from "../types/testType";

export async function insert(test: TCreateTest) {
  return await prisma.tests.create({
    data: test,
  });
}

export async function findById(id: number) {
  return await prisma.tests.findUnique({
    where: { id },
  });
}

export async function remove(id: number) {
  await prisma.tests.delete({
    where: { id },
  });
}

export async function findAllByUserIdWithFiles(userId: number) {
  return await prisma.$queryRaw`
    select t.id, t.title, t.notes, t.date, array(
      select coalesce(
        json_build_object('id', tf.id, 'name', tf.name, 'size', tf.size, 'url', tf.url)
      , '[] '
      ) from "testsFiles" tf
      where tf."testId"=t.id
    ) as files
    from tests t
    where t."userId"=${userId}
    order by t.date
  `;
}

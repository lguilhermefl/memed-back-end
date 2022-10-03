import { prisma } from "../config/database";
import { TCreateUser } from "../types/userType";

export async function insert(user: TCreateUser) {
  return await prisma.users.create({
    data: user,
  });
}

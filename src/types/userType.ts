import { Users } from "@prisma/client";

export type TUser = Users;
export type TCreateUser = Omit<TUser, "id" | "createdAt">;
export type TUpdateUser = Partial<TUser>;

import { Users } from "@prisma/client";

export type TUser = Users;
export type TSignInUser = Omit<TUser, "id" | "createdAt">;
export interface TCreateUser extends TSignInUser {
  repeat_password?: string;
}
export type TUpdateUser = Partial<TUser>;

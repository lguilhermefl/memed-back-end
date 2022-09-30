import { Tests } from "@prisma/client";

export type TTest = Tests;
export type TCreateTest = Omit<TTest, "id" | "createdAt">;

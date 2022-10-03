import { Tests } from "@prisma/client";

export type TTest = Tests;
export type TCreateTest = Omit<TTest, "id" | "createdAt">;
export type TTestData = Omit<TTest, "id" | "userId" | "createdAt">;
export type TUpdateTest = Partial<TTest>;

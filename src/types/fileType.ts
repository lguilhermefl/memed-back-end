import { TestsFiles } from "@prisma/client";

export type TCreateTest = Omit<TestsFiles, "id" | "createdAt">;

import { TestsFiles } from "@prisma/client";

export type TTestFile = TestsFiles;
export type TCreateTestFile = Omit<TestsFiles, "id" | "createdAt">;

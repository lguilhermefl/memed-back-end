import { TestsFiles } from "@prisma/client";

export type TFile = TestsFiles;
export type TCreateFile = Omit<TestsFiles, "id" | "createdAt">;

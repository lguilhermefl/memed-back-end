-- CreateTable
CREATE TABLE "testsFiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "testId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testsFiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testsFiles_key_key" ON "testsFiles"("key");

-- CreateIndex
CREATE UNIQUE INDEX "testsFiles_url_key" ON "testsFiles"("url");

-- AddForeignKey
ALTER TABLE "testsFiles" ADD CONSTRAINT "testsFiles_testId_fkey" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

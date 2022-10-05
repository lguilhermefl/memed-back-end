-- CreateTable
CREATE TABLE "appointmentsFiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "testId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointmentsFiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "appointmentsFiles_key_key" ON "appointmentsFiles"("key");

-- CreateIndex
CREATE UNIQUE INDEX "appointmentsFiles_url_key" ON "appointmentsFiles"("url");

-- AddForeignKey
ALTER TABLE "appointmentsFiles" ADD CONSTRAINT "appointmentsFiles_testId_fkey" FOREIGN KEY ("testId") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

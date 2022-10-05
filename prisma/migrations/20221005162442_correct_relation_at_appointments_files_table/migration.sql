/*
  Warnings:

  - You are about to drop the column `testId` on the `appointmentsFiles` table. All the data in the column will be lost.
  - Added the required column `appointmentId` to the `appointmentsFiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointmentsFiles" DROP CONSTRAINT "appointmentsFiles_testId_fkey";

-- AlterTable
ALTER TABLE "appointmentsFiles" DROP COLUMN "testId",
ADD COLUMN     "appointmentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "appointmentsFiles" ADD CONSTRAINT "appointmentsFiles_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

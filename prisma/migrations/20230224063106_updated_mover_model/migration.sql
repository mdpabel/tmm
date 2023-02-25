/*
  Warnings:

  - You are about to drop the column `hourlyRate` on the `Mover` table. All the data in the column will be lost.
  - Added the required column `applicantName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverLetter` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Mover` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "applicantName" TEXT NOT NULL,
ADD COLUMN     "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "coverLetter" TEXT NOT NULL,
ALTER COLUMN "applicationStatus" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Mover" DROP COLUMN "hourlyRate",
ADD COLUMN     "mobile" TEXT NOT NULL;

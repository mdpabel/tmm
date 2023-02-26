/*
  Warnings:

  - Made the column `bio` on table `Mover` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Mover" ALTER COLUMN "bio" SET NOT NULL;

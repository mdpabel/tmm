/*
  Warnings:

  - A unique constraint covering the columns `[moverId,jobId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Application_moverId_jobId_key" ON "Application"("moverId", "jobId");

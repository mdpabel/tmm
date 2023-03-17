-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_orderId_fkey";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

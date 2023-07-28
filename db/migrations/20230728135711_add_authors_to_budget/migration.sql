-- AlterTable
ALTER TABLE "User" ADD COLUMN     "budgetId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

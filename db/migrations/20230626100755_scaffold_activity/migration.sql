/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the `_ActivityToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActivityToUser" DROP CONSTRAINT "_ActivityToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivityToUser" DROP CONSTRAINT "_ActivityToUser_B_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "createdAt",
DROP COLUMN "value",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT;

-- DropTable
DROP TABLE "_ActivityToUser";

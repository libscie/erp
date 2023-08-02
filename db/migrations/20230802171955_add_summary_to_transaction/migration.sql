/*
  Warnings:

  - The `account` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `scope` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "type",
ADD COLUMN     "type" "TokenType" NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "summary" TEXT,
DROP COLUMN "account",
ADD COLUMN     "account" "TransactionType" NOT NULL DEFAULT 'CREDIT',
DROP COLUMN "scope",
ADD COLUMN     "scope" "EmissionScope" NOT NULL DEFAULT 'SCOPE3';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "GlobalRole" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");

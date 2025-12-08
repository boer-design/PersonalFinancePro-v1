/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Asset` table. All the data in the column will be lost.
  - The `assetType` column on the `Asset` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `currency` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `executedAt` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the `NavSnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Portfolio` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[symbol]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `side` on the `Trade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('STOCK', 'ETF', 'CRYPTO', 'OTHER');

-- CreateEnum
CREATE TYPE "TradeSide" AS ENUM ('BUY', 'SELL');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "NavSnapshot" DROP CONSTRAINT "NavSnapshot_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_userId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "portfolioId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "createdAt",
DROP COLUMN "assetType",
ADD COLUMN     "assetType" "AssetType" NOT NULL DEFAULT 'STOCK',
ALTER COLUMN "currency" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "currency",
DROP COLUMN "executedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "side",
ADD COLUMN     "side" "TradeSide" NOT NULL,
ALTER COLUMN "fee" SET DEFAULT 0;

-- DropTable
DROP TABLE "NavSnapshot";

-- DropTable
DROP TABLE "Portfolio";

-- CreateIndex
CREATE UNIQUE INDEX "Asset_symbol_key" ON "Asset"("symbol");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

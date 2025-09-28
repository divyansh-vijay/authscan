/*
  Warnings:

  - You are about to drop the column `cid` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `sha256Hash` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedAt` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Institute` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Institute` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `checkedCid` on the `Verification` table. All the data in the column will be lost.
  - You are about to drop the column `documentId` on the `Verification` table. All the data in the column will be lost.
  - You are about to drop the column `verificationStatus` on the `Verification` table. All the data in the column will be lost.
  - You are about to drop the `AdminAction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `uploadedById` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Verification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."AdminAction" DROP CONSTRAINT "AdminAction_adminId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Document" DROP CONSTRAINT "Document_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Verification" DROP CONSTRAINT "Verification_documentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Verification" DROP CONSTRAINT "Verification_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Document" DROP COLUMN "cid",
DROP COLUMN "fileUrl",
DROP COLUMN "sha256Hash",
DROP COLUMN "uploadedAt",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uploadedById" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Institute" DROP COLUMN "address",
DROP COLUMN "verified";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Verification" DROP COLUMN "checkedCid",
DROP COLUMN "documentId",
DROP COLUMN "verificationStatus",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "public"."AdminAction";

-- DropEnum
DROP TYPE "public"."VerificationStatus";

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Verification" ADD CONSTRAINT "Verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

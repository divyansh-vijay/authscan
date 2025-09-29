/*
  Warnings:

  - You are about to drop the column `status` on the `Verification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[instituteCode]` on the table `Institute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileType` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituteCode` to the `Institute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `certificateId` to the `Verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifierName` to the `Verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifierType` to the `Verification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."CertificateStatus" AS ENUM ('PENDING', 'ISSUED', 'REVOKED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."BatchUploadStatus" AS ENUM ('PROCESSING', 'COMPLETED', 'FAILED', 'PARTIAL');

-- CreateEnum
CREATE TYPE "public"."VerifierType" AS ENUM ('STUDENT', 'EMPLOYER', 'INSTITUTION', 'GOVERNMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."VerificationResult" AS ENUM ('PENDING', 'VERIFIED', 'FAILED', 'EXPIRED', 'REVOKED');

-- DropForeignKey
ALTER TABLE "public"."Verification" DROP CONSTRAINT "Verification_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Document" ADD COLUMN     "fileSize" INTEGER,
ADD COLUMN     "fileType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Institute" ADD COLUMN     "address" TEXT,
ADD COLUMN     "instituteCode" TEXT NOT NULL,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "public"."Verification" DROP COLUMN "status",
ADD COLUMN     "certificateId" TEXT NOT NULL,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "result" "public"."VerificationResult" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userAgent" TEXT,
ADD COLUMN     "verifierEmail" TEXT,
ADD COLUMN     "verifierName" TEXT NOT NULL,
ADD COLUMN     "verifierOrg" TEXT,
ADD COLUMN     "verifierType" "public"."VerifierType" NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "duration" TEXT,
    "description" TEXT,
    "instituteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Certificate" (
    "id" TEXT NOT NULL,
    "certificateId" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "programCode" TEXT,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "grade" TEXT,
    "duration" TEXT,
    "description" TEXT,
    "status" "public"."CertificateStatus" NOT NULL DEFAULT 'PENDING',
    "blockchainTx" TEXT,
    "certificateHash" TEXT NOT NULL,
    "fileUrl" TEXT,
    "metadata" JSONB,
    "instituteId" TEXT NOT NULL,
    "issuedById" TEXT NOT NULL,
    "studentId" TEXT,
    "programId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "batchUploadId" TEXT,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BatchUpload" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "totalCount" INTEGER NOT NULL,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "status" "public"."BatchUploadStatus" NOT NULL DEFAULT 'PROCESSING',
    "uploadedById" TEXT NOT NULL,
    "instituteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BatchUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BatchUploadError" (
    "id" TEXT NOT NULL,
    "batchUploadId" TEXT NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "rowData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchUploadError_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ApiKey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastUsed" TIMESTAMP(3),
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "instituteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Program_code_instituteId_key" ON "public"."Program"("code", "instituteId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificateId_key" ON "public"."Certificate"("certificateId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificateHash_key" ON "public"."Certificate"("certificateHash");

-- CreateIndex
CREATE INDEX "Certificate_instituteId_idx" ON "public"."Certificate"("instituteId");

-- CreateIndex
CREATE INDEX "Certificate_studentEmail_idx" ON "public"."Certificate"("studentEmail");

-- CreateIndex
CREATE INDEX "Certificate_certificateId_idx" ON "public"."Certificate"("certificateId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_keyHash_key" ON "public"."ApiKey"("keyHash");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_instituteCode_key" ON "public"."Institute"("instituteCode");

-- CreateIndex
CREATE INDEX "Verification_certificateId_idx" ON "public"."Verification"("certificateId");

-- CreateIndex
CREATE INDEX "Verification_result_idx" ON "public"."Verification"("result");

-- CreateIndex
CREATE INDEX "Verification_createdAt_idx" ON "public"."Verification"("createdAt");

-- AddForeignKey
ALTER TABLE "public"."Program" ADD CONSTRAINT "Program_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "public"."Institute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Certificate" ADD CONSTRAINT "Certificate_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "public"."Institute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Certificate" ADD CONSTRAINT "Certificate_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Certificate" ADD CONSTRAINT "Certificate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Certificate" ADD CONSTRAINT "Certificate_programId_fkey" FOREIGN KEY ("programId") REFERENCES "public"."Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Certificate" ADD CONSTRAINT "Certificate_batchUploadId_fkey" FOREIGN KEY ("batchUploadId") REFERENCES "public"."BatchUpload"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BatchUpload" ADD CONSTRAINT "BatchUpload_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BatchUploadError" ADD CONSTRAINT "BatchUploadError_batchUploadId_fkey" FOREIGN KEY ("batchUploadId") REFERENCES "public"."BatchUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Verification" ADD CONSTRAINT "Verification_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "public"."Certificate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Verification" ADD CONSTRAINT "Verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ApiKey" ADD CONSTRAINT "ApiKey_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "public"."Institute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

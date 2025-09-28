-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN', 'INSTITUTE');

-- CreateEnum
CREATE TYPE "public"."VerificationStatus" AS ENUM ('SUCCESS', 'FAILURE');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Institute" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "instituteName" TEXT NOT NULL,
    "address" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Institute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "sha256Hash" TEXT NOT NULL,
    "cid" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "instituteId" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Verification" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "userId" TEXT,
    "verificationStatus" "public"."VerificationStatus" NOT NULL,
    "checkedCid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdminAction" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_userId_key" ON "public"."Institute"("userId");

-- AddForeignKey
ALTER TABLE "public"."Institute" ADD CONSTRAINT "Institute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "public"."Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Verification" ADD CONSTRAINT "Verification_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "public"."Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Verification" ADD CONSTRAINT "Verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminAction" ADD CONSTRAINT "AdminAction_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

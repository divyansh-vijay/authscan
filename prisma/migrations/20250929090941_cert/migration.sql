/*
  Warnings:

  - You are about to drop the column `program` on the `Certificate` table. All the data in the column will be lost.
  - Added the required column `courseName` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Certificate" DROP COLUMN "program",
ADD COLUMN     "courseName" TEXT NOT NULL,
ADD COLUMN     "organization" TEXT,
ALTER COLUMN "studentEmail" DROP NOT NULL;

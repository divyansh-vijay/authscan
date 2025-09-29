-- AlterTable
ALTER TABLE "public"."Certificate" ADD COLUMN     "blockNumber" INTEGER,
ADD COLUMN     "transactionHash" TEXT,
ADD COLUMN     "uploadedOnchain" BOOLEAN NOT NULL DEFAULT false;

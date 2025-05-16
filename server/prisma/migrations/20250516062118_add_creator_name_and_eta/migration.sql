-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "creator_name" VARCHAR(100),
ADD COLUMN     "eta" TIMESTAMPTZ(6);

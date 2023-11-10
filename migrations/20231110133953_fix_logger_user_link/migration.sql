/*
  Warnings:

  - Made the column `userId` on table `UserLogs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserLogs" DROP CONSTRAINT "UserLogs_userId_fkey";

-- AlterTable
ALTER TABLE "UserLogs" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserLogs" ADD CONSTRAINT "UserLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

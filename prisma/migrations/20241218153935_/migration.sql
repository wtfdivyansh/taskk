/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Board` table. All the data in the column will be lost.
  - The `role` column on the `BoardMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `content` on the `Task` table. All the data in the column will be lost.
  - The `priority` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `targetDate` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Made the column `dueDate` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `assigneeId` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdById` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'member');

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "dueDate",
ADD COLUMN     "targetDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'todo';

-- AlterTable
ALTER TABLE "BoardMember" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'member';

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "content",
ADD COLUMN     "description" TEXT,
DROP COLUMN "priority",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'low',
ALTER COLUMN "dueDate" SET NOT NULL,
ALTER COLUMN "assigneeId" SET NOT NULL,
ALTER COLUMN "createdById" SET NOT NULL;

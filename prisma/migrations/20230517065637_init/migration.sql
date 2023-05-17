/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Actions" AS ENUM ('EDIT', 'ADD_COLLABORATOR', 'DELETE', 'MANAGE_STATE');

-- DropForeignKey
ALTER TABLE "Collaborator" DROP CONSTRAINT "Collaborator_postId_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_collaboratorId_fkey";

-- AlterTable
ALTER TABLE "Collaborator" ADD COLUMN     "permissions" "Actions"[] DEFAULT ARRAY['EDIT', 'ADD_COLLABORATOR']::"Actions"[];

-- DropTable
DROP TABLE "Permission";

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

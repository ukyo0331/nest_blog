/*
  Warnings:

  - You are about to drop the column `postId` on the `OgpMetaData` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `OgpMetaData` DROP FOREIGN KEY `OgpMetaData_postId_fkey`;

-- AlterTable
ALTER TABLE `OgpMetaData` DROP COLUMN `postId`;

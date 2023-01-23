/*
  Warnings:

  - You are about to alter the column `assignedBy` on the `CategoriesOnPosts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `CategoriesOnPosts` MODIFY `assignedBy` INTEGER NOT NULL;

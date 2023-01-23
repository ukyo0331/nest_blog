/*
  Warnings:

  - The primary key for the `CategoriesOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `CategoriesOnPosts` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`postId`, `categoryId`);

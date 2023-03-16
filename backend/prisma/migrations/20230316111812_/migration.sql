/*
  Warnings:

  - Added the required column `postId` to the `OgpMetaData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OgpMetaData` ADD COLUMN `postId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OgpMetaData` ADD CONSTRAINT `OgpMetaData_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

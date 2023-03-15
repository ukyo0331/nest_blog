-- DropForeignKey
ALTER TABLE `OgpMetaData` DROP FOREIGN KEY `OgpMetaData_postId_fkey`;

-- AddForeignKey
ALTER TABLE `OgpMetaData` ADD CONSTRAINT `OgpMetaData_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

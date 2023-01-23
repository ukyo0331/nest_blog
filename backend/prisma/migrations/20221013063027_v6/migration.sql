-- DropForeignKey
ALTER TABLE `CategoriesOnPosts` DROP FOREIGN KEY `CategoriesOnPosts_postId_fkey`;

-- AddForeignKey
ALTER TABLE `CategoriesOnPosts` ADD CONSTRAINT `CategoriesOnPosts_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

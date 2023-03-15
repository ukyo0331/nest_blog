-- CreateTable
CREATE TABLE `OgpMetaData` (
    `id` VARCHAR(191) NOT NULL,
    `encordedUrl` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `favicon` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OgpMetaData` ADD CONSTRAINT `OgpMetaData_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

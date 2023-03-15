/*
  Warnings:

  - You are about to drop the column `encordedUrl` on the `OgpMetaData` table. All the data in the column will be lost.
  - Added the required column `encodedUrl` to the `OgpMetaData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OgpMetaData` DROP COLUMN `encordedUrl`,
    ADD COLUMN `encodedUrl` VARCHAR(191) NOT NULL;

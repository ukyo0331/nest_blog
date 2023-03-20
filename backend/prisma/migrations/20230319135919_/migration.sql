-- DropIndex
DROP INDEX "OgpMetaData_encodedUrl_key";

-- AlterTable
ALTER TABLE "OgpMetaData" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "favicon" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

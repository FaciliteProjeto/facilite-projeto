-- DropIndex
DROP INDEX "cars_poster_url_key";

-- AlterTable
ALTER TABLE "cars" ALTER COLUMN "poster_url" DROP DEFAULT;

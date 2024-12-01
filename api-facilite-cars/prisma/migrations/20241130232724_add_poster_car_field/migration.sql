/*
  Warnings:

  - A unique constraint covering the columns `[poster_url]` on the table `cars` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "poster_url" TEXT NOT NULL DEFAULT 'default_poster_url';

-- CreateIndex
CREATE UNIQUE INDEX "cars_poster_url_key" ON "cars"("poster_url");

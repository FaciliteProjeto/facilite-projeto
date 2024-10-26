/*
  Warnings:

  - Made the column `home_phone` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mobile_phone` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `income` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "home_phone" SET NOT NULL,
ALTER COLUMN "mobile_phone" SET NOT NULL,
ALTER COLUMN "income" SET NOT NULL;

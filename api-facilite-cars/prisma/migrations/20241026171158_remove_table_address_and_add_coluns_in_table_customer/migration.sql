/*
  Warnings:

  - You are about to drop the column `address_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_address_id_fkey";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "address_id",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL;

-- DropTable
DROP TABLE "addresses";

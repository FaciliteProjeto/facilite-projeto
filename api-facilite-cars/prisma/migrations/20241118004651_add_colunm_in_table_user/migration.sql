-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SELLER', 'CUSTOMER', 'BILLING', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER';

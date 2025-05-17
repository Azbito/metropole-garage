/*
  Warnings:

  - You are about to drop the column `color` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Car` table. All the data in the column will be lost.
  - Added the required column `primaryColor` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondaryColor` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Car` DROP COLUMN `color`,
    DROP COLUMN `owner`,
    ADD COLUMN `primaryColor` VARCHAR(191) NOT NULL,
    ADD COLUMN `secondaryColor` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

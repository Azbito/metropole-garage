/*
  Warnings:

  - Made the column `userId` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Car` DROP FOREIGN KEY `Car_userId_fkey`;

-- DropIndex
DROP INDEX `Car_userId_fkey` ON `Car`;

-- AlterTable
ALTER TABLE `Car` MODIFY `userId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `AvailableUserCars` (
    `id` VARCHAR(191) NOT NULL,
    `car_model` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AvailableUserCars` ADD CONSTRAINT `AvailableUserCars_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

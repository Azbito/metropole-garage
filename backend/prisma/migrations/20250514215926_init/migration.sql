-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `owner` VARCHAR(191) NOT NULL,
    `damage` INTEGER NOT NULL,
    `fuel` INTEGER NOT NULL,
    `locked` BOOLEAN NOT NULL,
    `positionX` DOUBLE NOT NULL,
    `positionY` DOUBLE NOT NULL,
    `positionZ` DOUBLE NOT NULL,
    `purchaseDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Car_plate_key`(`plate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

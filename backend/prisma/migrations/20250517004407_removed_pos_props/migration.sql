/*
  Warnings:

  - You are about to drop the column `positionX` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `positionY` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `positionZ` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Car` DROP COLUMN `positionX`,
    DROP COLUMN `positionY`,
    DROP COLUMN `positionZ`;

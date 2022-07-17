/*
  Warnings:

  - Added the required column `sorterDate` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Room` ADD COLUMN `sorterDate` DATETIME(3) NOT NULL;

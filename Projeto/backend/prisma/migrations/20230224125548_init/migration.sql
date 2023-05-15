/*
  Warnings:

  - You are about to drop the column `marcar` on the `frota` table. All the data in the column will be lost.
  - Added the required column `marca` to the `Frota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `frota` DROP COLUMN `marcar`,
    ADD COLUMN `marca` VARCHAR(191) NOT NULL;

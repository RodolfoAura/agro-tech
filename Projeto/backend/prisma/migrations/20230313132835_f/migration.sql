/*
  Warnings:

  - Added the required column `tipo` to the `Frota` table without a default value. This is not possible if the table is not empty.
  - Made the column `descricao` on table `manutencao` required. This step will fail if there are existing NULL values in that column.
  - Made the column `valor` on table `manutencao` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_inicio` on table `manutencao` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `frota` ADD COLUMN `tipo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `manutencao` MODIFY `descricao` VARCHAR(191) NOT NULL,
    MODIFY `valor` DOUBLE NOT NULL,
    MODIFY `data_inicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

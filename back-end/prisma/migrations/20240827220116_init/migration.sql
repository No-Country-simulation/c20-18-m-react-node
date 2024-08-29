/*
  Warnings:

  - You are about to drop the column `nombre` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Padre` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Profesor` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `Estudiante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estudiante" DROP COLUMN "nombre",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Padre" DROP COLUMN "nombre";

-- AlterTable
ALTER TABLE "Profesor" DROP COLUMN "nombre";

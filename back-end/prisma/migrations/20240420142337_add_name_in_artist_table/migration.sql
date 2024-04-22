/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

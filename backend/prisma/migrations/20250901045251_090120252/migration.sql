/*
  Warnings:

  - Added the required column `rarity` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Pokemon" ADD COLUMN     "rarity" TEXT NOT NULL;

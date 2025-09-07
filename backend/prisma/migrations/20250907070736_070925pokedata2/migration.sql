-- AlterTable
ALTER TABLE "public"."Pokemon" ADD COLUMN     "base_pokemon" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rarity" TEXT;

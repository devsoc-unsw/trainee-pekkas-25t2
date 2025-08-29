-- CreateTable
CREATE TABLE "public"."ActivePokemon" (
    "userId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "ActivePokemon_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivePokemon_pokemonId_key" ON "public"."ActivePokemon"("pokemonId");

-- AddForeignKey
ALTER TABLE "public"."ActivePokemon" ADD CONSTRAINT "fk_active_slot_user" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivePokemon" ADD CONSTRAINT "fk_active_slot_pokemon" FOREIGN KEY ("pokemonId") REFERENCES "public"."PokemonInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "dateJoined" TIMESTAMP(3) NOT NULL,
    "pokeballs" INTEGER NOT NULL,
    "icon" TEXT,
    "featured_pokemon" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PokemonInstance" (
    "id" SERIAL NOT NULL,
    "trainerId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "exp_lvl" INTEGER NOT NULL,
    "nickname" TEXT,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "PokemonInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pokemon" (
    "pokedex_number" INTEGER NOT NULL,
    "primary_type" TEXT NOT NULL,
    "secondary_type" TEXT,
    "level_to_evolve" INTEGER,
    "evolves_from_id" INTEGER,
    "icon" TEXT,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("pokedex_number")
);

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_UserFriends" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserFriends_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "_UserFriends_B_index" ON "public"."_UserFriends"("B");

-- AddForeignKey
ALTER TABLE "public"."PokemonInstance" ADD CONSTRAINT "PokemonInstance_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PokemonInstance" ADD CONSTRAINT "PokemonInstance_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "public"."Pokemon"("pokedex_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pokemon" ADD CONSTRAINT "Pokemon_evolves_from_id_fkey" FOREIGN KEY ("evolves_from_id") REFERENCES "public"."Pokemon"("pokedex_number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserFriends" ADD CONSTRAINT "_UserFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserFriends" ADD CONSTRAINT "_UserFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

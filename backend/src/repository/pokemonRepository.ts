import prisma from "../config/prisma";
import { createPokemonInstanceType } from "../types/pokemon";

class pokemonRepository {
    //seems as though prisma doesn't have a get random function, so randomness is determined by the
    //controller(validates enum + turns it into string) and is returned here.
    async getPokemonByRarity(rarity:string) {
        const res = await prisma.pokemon.findMany({
            where: {rarity: rarity, base_pokemon: true}
        });

        return res;
    }

    async createPokemonInstance(pokeParams:createPokemonInstanceType) {
        const res = await prisma.pokemonInstance.create({
            data: {
                speciesId: pokeParams.pokedexNum,
                level: pokeParams.level,
                trainerId: pokeParams.trainerId,
                exp_lvl: 0
            }
        })

        return res;
    }

    async getPokemonInstanceById(pokemonId:number) {
        const res = await prisma.pokemonInstance.findFirst({
            where: { id: pokemonId },
        });
        return res;
    }

    async getPokemonInstancesByUser(userId:number) {
        const res = await prisma.pokemonInstance.findMany({
            where: {trainerId: userId}
        })

        return res;
    }

    async renamePokemon(pokemonId:number, newname:string) {
        const res = await prisma.pokemonInstance.update({
            where: {id: pokemonId},
            data: {nickname: newname}
        });

        return res;
    }


    async levelPokemon(pokemonId:number, exp:number) {
        const res = await prisma.pokemonInstance.update({
            where: {id: pokemonId},
            data: {
                exp_lvl: {increment: exp}
            }
        })

        return res;
    }

    //a bit clapped logic to deal with evolution, decided to break it up like
    //this since pokemon evolution logic can be quite strange, worth a refactor

    //getAllPokemonEvos in case we have branching evos, call in case a pokemon levels up to evo level
    async getAllPokemonEvos(pokedexNum:number) {
        const res = await prisma.pokemon.findMany({
            where: {evolves_from_id: pokedexNum}
        });

        return res;
    }

    //actual evo logic in all actuality this is just reassigning a pokemon to be of a diff species
    async evolvePokemon(pokemonId:number, newPokedexNum:number) {
        const res = await prisma.pokemonInstance.update({
            where: {id: pokemonId},
            data:   {speciesId: newPokedexNum}
        })

        return res;
    }

    async addPokemonExp(pokemonId: number, exp: number) {
        await prisma.pokemonInstance.update({
            where: { id: pokemonId },
            data: {
                exp_lvl: {
                    increment: exp
                }
            }
        })
    }

    async levelUpPokemon(pokemonId: number) {
        await prisma.pokemonInstance.update({
            where: { id: pokemonId },
            data: {
                level: {
                    increment: 1
                }
            }
        })
    }

    async getPokemonSpeciesById(pokemonId: number) {
        const res = await prisma.pokemonInstance.findFirst({
            where: { id: pokemonId },
            select: {
                species: {
                    include: {
                        evolves_into: true
                    }
                }
            }
        })

        return res?.species;
    }

    async getUserActivePokemon(userId: number) {
        const res = await prisma.activePokemon.findFirst({
            where: { userId },
            select: { 
                pokemon: {
                    include: {
                        species: true
                    }
                }
            }
        })

        return res?.pokemon
    }

    async setUserActivePokemon(userId: number, pokemonId: number) {
        const res = await prisma.activePokemon.upsert({
            where: { userId },
            update: { pokemonId }, 
            create: { userId, pokemonId }, 
            select: { 
                pokemon: {
                    include: {
                        species: true
                    }
                }
            }
        });

        return res.pokemon
    }
}

export default new pokemonRepository();
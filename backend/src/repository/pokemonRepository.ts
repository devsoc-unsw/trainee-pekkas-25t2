import prisma from "../config/prisma";

class pokemonRepository {
    //seems as though prisma doesn't have a get random function, so randomness is determined by the
    //controller(validates enum + turns it into string) and is returned here.
    async getPokemonByRarity(rarity:string) {
        const res = await prisma.pokemon.findMany({
            where: {rarity: rarity, base_pokemon: true}
        });

        return res;
    }


    async createPokemonInstance() {

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
}

export default new pokemonRepository();
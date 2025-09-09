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
}

export default new pokemonRepository();
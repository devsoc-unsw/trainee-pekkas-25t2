import pokemonRepository from "../repository/pokemonRepository";
import userRepository from "../repository/userRepository";
import { Rarities } from "../types/pokemon";

class pokemonService {
    async getRandomPokemon() {
        let rarity:Rarities;
        const num:number = Math.floor(Math.random() * 100) + 1;

        if (num < 45 && num >= 1) {
            rarity = Rarities.Common;
        } else if (num < 70 && num >= 45) {
            rarity = Rarities.Uncommon;
        } else if (num < 85 && num >= 70) {
            rarity = Rarities.Rare;
        } else if (num < 95 && num >= 85) {
            rarity = Rarities.Starter;
        } else if (num <= 100 && num >= 95) {
            rarity = Rarities.Legendary;
        } else {
            rarity = Rarities.Common;
        }

        const pokemonList = await pokemonRepository.getPokemonByRarity(rarity as string);

        const num2:number = Math.floor(Math.random() * pokemonList.length);
        return pokemonList[num2];
    }

    async getPokemonInstanceById(pokemonId:number) {
        return await pokemonRepository.getPokemonInstanceById(pokemonId);
    }

    async getUserPokemon(userId:number) {
        return await pokemonRepository.getPokemonInstancesByUser(userId);
    }

    async renamePokemon(pokemonId:number, newname:string) {
        return await pokemonRepository.renamePokemon(pokemonId, newname);
    }

    async catchPokemon(userId:number) {
        const pokemonCaught = await this.getRandomPokemon();
        let level:number;

        if (pokemonCaught === undefined) {
            return null;
        }

        await userRepository.usePokeball(userId);

        if (pokemonCaught.level_to_evolve === null) {
            level = Math.floor(Math.random() * (15-5)) + 5
        } else {
            level = Math.floor(Math.random() * (pokemonCaught.level_to_evolve - 5)) + 5;
        }

        return await pokemonRepository.createPokemonInstance({
            pokedexNum: pokemonCaught.pokedex_number,
            level: level,
            trainerId: userId
        })
    }
}

export default new pokemonService();
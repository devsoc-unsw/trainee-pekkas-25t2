import pokemonRepository from "../repository/pokemonRepository";
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
}

export default new pokemonService();
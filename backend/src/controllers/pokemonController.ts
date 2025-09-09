import { Request, Response } from "express";
import pokemonService from "../services/pokemonService";

class pokemonController {
    async getRandomPokemon(req:Request, res:Response) {
        try {
            const pokemonList = await pokemonService.getRandomPokemon();
            return res.status(200).json(pokemonList);
        } catch (error) {
            return res.status(500).json({error: error});
        }
    }
    

}

export default new pokemonController();
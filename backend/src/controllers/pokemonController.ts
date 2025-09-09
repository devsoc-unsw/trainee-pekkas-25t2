import { Request, Response } from "express";
import pokemonService from "../services/pokemonService";

class pokemonController {
    async getRandomPokemon(req:Request, res:Response) {
        try {
            const pokemonList = await pokemonService.getRandomPokemon();
            return res.status(200).json(pokemonList);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }
            return res.status(500).json({error: "Internal Server Error"});
        }
    }

    async getPokemonById(req:Request, res:Response) {
        const { pokemonId } = req.params;
        try {
            console.log(pokemonId);
            const pokemon = await pokemonService.getPokemonInstanceById(Number(pokemonId));

            if (!pokemon) return res.status(404).json({error: "No pokemon with matching id"});

            return res.status(200).json(pokemon);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }
            return res.status(500).json({error: "Internal Server Error"});
        }
    }

    async getUserPokemon(req:Request, res:Response) {
        const userId = req.session.userId as number

        try {
            const userPokemon = await pokemonService.getUserPokemon(userId);
            return res.status(200).json(userPokemon);
        } catch (error) {
            return res.status(500).json({error: error});
        }
    }

}

export default new pokemonController();
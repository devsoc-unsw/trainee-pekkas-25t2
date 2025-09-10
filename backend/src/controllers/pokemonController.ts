import { Request, Response } from "express";
import { TypedRequest, TypedRequestQuery } from "../types/requests";
import pokemonService from "../services/pokemonService";
import userService from "../services/userService";
import { pokemonRenameBody } from "../types/pokemon";

class pokemonController {
    //no need to typed request this
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

    //Or this, since it's in the params
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
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }
            return res.status(500).json({error: "Internal Server Error"});
        }
    }

    async renamePokemon(req:TypedRequest<pokemonRenameBody>, res:Response) {
        const {pokemonId, newname} = req.body;

        try {
            const retval = await pokemonService.renamePokemon(pokemonId as number, newname as string);
            return res.status(200).json(retval);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }
            return res.status(500).json({error: "Internal Server Error"});
        }
    }

    async catchPokemon(req:Request, res:Response) {
        const userId = req.session.userId as number
        try {
            const userData = await userService.getUserById(userId);
            if (userData === null || userData === undefined) {
                return res.status(400).json({error: "User not found!"});
            }

            if (userData.pokeballs < 0) {
                return res.status(400).json({error: "Not enough pokeballs!"});
            }

            //should return pokemon caught
            const retval = await pokemonService.catchPokemon(userId);
            return res.status(200).json(retval);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }
            return res.status(500).json({error: "Internal Server Error"});
        }
    }
}

export default new pokemonController();
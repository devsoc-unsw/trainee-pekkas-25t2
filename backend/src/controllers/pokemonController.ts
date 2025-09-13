import { Request, Response } from "express";
import pokemonService from "../services/pokemonService";
import userService from "../services/userService";
import { pokemonIdParams, pokemonRenameBody } from "../types/pokemon";

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

    async getPokemonById(req:Request<pokemonIdParams, {}, {}, {}>, res:Response) {
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

    async renamePokemon(req:Request<pokemonIdParams, {}, pokemonRenameBody, {}>, res:Response) {
        const {newname} = req.body;
        const {pokemonId} = req.params;
        console.log(pokemonId);
        try {
            const retval = await pokemonService.renamePokemon(Number(pokemonId), newname as string);
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
        if (!userId) return res.status(401).json({ error: "Not authenticated" });
        try {
            const userData = await userService.getUserById(userId);
            if (userData === null || userData === undefined) {
                return res.status(401).json({error: "User not found!"});
            }

            if (userData.pokeballs <= 0) {
                return res.status(401).json({error: "Not enough pokeballs!"});
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

    async levelUpPokemon(req:Request<pokemonIdParams, {}, pokemonRenameBody, {}>, res:Response) {
        const {pokemonId} = req.params;

        try {
            const updatedPokemon = await pokemonService.levelUpPokemon(Number(pokemonId))
            return res.status(200).json(updatedPokemon);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }
            return res.status(500).json({error: "Internal Server Error"});
        }
    }

    async getUserActivePokemon(req:Request, res:Response) {
        const userId = req.session.userId as number

        try {
            const userPokemon = await pokemonService.getUserActivePokemon(userId);
            return res.status(200).json(userPokemon);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }
            return res.status(500).json({error: "Internal Server Error"});
        }
    }

    async setUserActivePokemon(req: Request, res: Response) {
        const userId = req.session.userId as number
        const { pokemonId } = req.body

        try {
        const tasks = await pokemonService.setActivePokemon(userId, Number(pokemonId));
        return res.status(200).json(tasks)
        } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
        }
    }

}

export default new pokemonController();
import express from "express";
import pokemonController from "../controllers/pokemonController";

const router = express.Router();

//this shouldn't be called highk mainly just so we can test the endpoint
router.get("/random", pokemonController.getRandomPokemon);
//get all a users pokemon
router.get("/owned", pokemonController.getUserPokemon);
router.get("/instance/:pokemonId", pokemonController.getPokemonById);
router.post("/instance/:pokemonId/rename", pokemonController.renamePokemon);
router.post("/catch", pokemonController.catchPokemon);

export default router;
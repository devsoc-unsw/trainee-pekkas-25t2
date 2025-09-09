import express from "express";
import pokemonController from "../controllers/pokemonController";

const router = express.Router();

//this shouldn't be called highk mainly just so we can test the endpoint
router.get("/random", pokemonController.getRandomPokemon);
router.get("/owned");
export default router;
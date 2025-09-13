import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.post("/createUser", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/name", userController.getUserByName);
router.get("/pokeballs", userController.getUserPokeballs);
export default router;

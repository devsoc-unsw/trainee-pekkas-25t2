import express from "express";
import taskController from "../controllers/taskController";
import { authHandler } from "../middlewares/auth";

const router = express.Router();

// only authorised users can access task routes
router.use(authHandler)

router.get("/", taskController.getTasks);
// router.post("/");
// router.put("/:id");
// router.delete("/:id");
export default router;

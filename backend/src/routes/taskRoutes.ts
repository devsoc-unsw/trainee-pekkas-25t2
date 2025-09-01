import express from "express";
import taskController from "../controllers/taskController";

const router = express.Router();

router.get("/", taskController.getTasks);
// router.post("/");
// router.put("/:id");
// router.delete("/:id");
export default router;

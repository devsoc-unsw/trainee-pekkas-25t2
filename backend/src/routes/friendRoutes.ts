import express from "express";
import { authHandler } from "../middlewares/auth";
import friendController from "../controllers/friendController";

const router = express.Router();

router.use(authHandler)

router.get("/", friendController.getUserFriends);
router.get("/requests/received", friendController.getUserFriendRequests);
router.get("/requests/sent", friendController.getUserSentFriendRequests);
router.post("/request/:userId", friendController.sendFriendRequest);
router.patch("/request/:requestId", friendController.updateFriendRequest);

export default router;
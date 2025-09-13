import { Request, Response } from "express";
import friendService from "../services/friendService";

class friendController {
  async getUserFriends(
    req: Request,
    res: Response
  ) {
    const userId = req.session.userId as number

    try {
      const tasks = await friendService.getUserFriends(userId);
      return res.status(200).json(tasks)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserFriendRequests(
    req: Request,
    res: Response
  ) {
    const userId = req.session.userId as number

    try {
      const tasks = await friendService.getUserFriendRequests(userId);
      return res.status(200).json(tasks)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserSentFriendRequests(
    req: Request,
    res: Response
  ) {
    const userId = req.session.userId as number

    try {
      const tasks = await friendService.getUserFriendSentRequests(userId);
      return res.status(200).json(tasks)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateFriendRequest(
    req: Request,
    res: Response
  ) {
    const { accept } = req.body
    const { requestId } = req.params

    try {
      const tasks = await friendService.updateFriendRequest(Number(requestId), Boolean(accept));
      return res.status(200).json(tasks)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async sendFriendRequest(
    req: Request,
    res: Response
  ) {
    const fromUserId = req.session.userId as number

    const { userId } = req.params

    try {
      const tasks = await friendService.sendFriendRequest(fromUserId, Number(userId));
      return res.status(200).json(tasks)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new friendController()
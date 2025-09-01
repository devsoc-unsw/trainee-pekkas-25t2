import { Request, Response } from "express";
import { validateSession } from "../util/util";
import taskService from "../services/taskService";

class taskController {
  async getTasks(req: Request, res: Response) {
    const sessionData = req.session ? await validateSession(req.session) : null

    if (!sessionData) {
      return res.status(401).json({ error: "Invalid session" })
    }

    const userId = sessionData.userId

    try {
      const tasks = await taskService.getTasks(userId);
      return res.status(200).json(tasks)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new taskController()
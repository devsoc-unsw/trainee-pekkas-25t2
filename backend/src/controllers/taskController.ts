import { Request, Response } from "express";
import taskService from "../services/taskService";

class taskController {
  async getTasks(req: Request, res: Response) {
    // this is already validated in middleware so should be safe to typecast
    const userId = req.session.userId as number

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
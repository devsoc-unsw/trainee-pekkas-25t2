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

  async createTask(req: Request, res: Response) {
    const userId = req.session.userId as number

    // would probably be good to have some sort of type validation for these but works for now
    const { description, dueDate } = req.body

    try {
      const task = await taskService.createTask(userId, description, dueDate)
      return res.status(200).json(task)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new taskController()
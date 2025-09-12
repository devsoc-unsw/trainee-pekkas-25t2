import { Request, Response } from "express";
import taskService from "../services/taskService";
import { CreateTaskRequestBody, DeleteTaskRequestParams, UpdateTaskRequestBody, UpdateTaskRequestParams } from "../types/task";

class taskController {
  async getTasks(
    req: Request<{}, {}, {}, {}>,
    res: Response
  ) {
    // this is already validated in middleware so should be safe to typecast
    const userId = req.session.userId as number

    try {
      const tasks = await taskService.getTasks(userId);
      return res.status(200).json(tasks)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async createTask(
    req: Request<{}, {}, CreateTaskRequestBody, {}>,
    res: Response
  ) {
    const userId = req.session.userId as number

    try {
      const { description, dueDate } = req.body
      let parsedDueDate = dueDate ? new Date(dueDate) : undefined

      const task = await taskService.createTask(userId, description, parsedDueDate)
      return res.status(200).json(task)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateTask(
    req: Request<UpdateTaskRequestParams, {}, UpdateTaskRequestBody, {}>,
    res: Response
  ) {
    const userId = req.session.userId as number

    try {
      if (!req.params['id'])
        return res.status(400).json({ error: "Missing required fields" });

      const { description, complete, dueDate } = req.body
      let parsedDueDate = dueDate ? new Date(dueDate) : undefined

      const taskId = Number(req.params['id'])

      const task = await taskService.updateTask(userId, taskId, description, complete, parsedDueDate)
      return res.status(200).json(task)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteTask(
    req: Request<DeleteTaskRequestParams, {}, {}, {}>,
    res: Response
  ) {
    const userId = req.session.userId as number

    try {
      if (!req.params['id'])
        return res.status(400).json({ error: "Missing required fields" });

      const taskId = Number(req.params['id'])

      const task = await taskService.deleteTask(userId, taskId)

      return res.status(200).json({ error: "Succesfully deleted task" })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new taskController()
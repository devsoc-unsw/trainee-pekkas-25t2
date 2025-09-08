import prisma from "../config/prisma";
import { CreateTaskFields, UpdateTaskFields } from "../types/task";

class taskRepository {
  async getTasksByUserId(userId: number) {
    const res = await prisma.task.findMany({
      where: { userId },
    });

    return res;
  }

  async createTask(data: CreateTaskFields) {
    try {
      if (data === undefined) {
        return null;
      }
      return await prisma.task.create({
        data,
        select: {
          id: true,
          userId: true,
          description: true,
          complete: true,
          created: true,
          lastUpdated: true,
          dueDate: true,
        },
      });
    } catch (_error) {
      throw new Error("Invalid user")
    }
  }

  async updateTask(taskId: number, data: UpdateTaskFields) {
    return await prisma.task.update({
      where: { id: taskId },
      data
    })
  }

  async deleteTask(id: number) {
    await prisma.task.delete({ where: { id } })
  }

  async getTaskById(id: number) {
    return await prisma.task.findFirst({
      where: { id },
    });
  }
}

export default new taskRepository();

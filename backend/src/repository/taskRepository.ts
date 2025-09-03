import { Task } from "@prisma/client";
import prisma from "../config/prisma";

type UpdatableTaskFields = Pick<Task, 'description' | 'complete' | 'dueDate'>

class taskRepository {
  async getTasksByUserId(userId: number) {
    const res = await prisma.task.findMany({
      where: { userId },
    });

    return res;
  }

  async createTask(userId: number, description: string, dueDate?: Date) {
    return await prisma.task.create({
      data: {
        userId,
        description,
        complete: false,
        dueDate: dueDate ?? null
      },
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
  }

  async updateTask(id: number, data: UpdatableTaskFields) {
    return prisma.task.update({
      where: { id }, 
      data
    })
  }
}

export default new taskRepository();
